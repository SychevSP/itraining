import React from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, StyleSheet, Dimensions, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import firebase from '/firebaseInit';
import { printDate, printTime } from 'lib/Calendar/utils'
import BcgIMG from 'Components/BcgIMG'

const TAB_BAR_HEIGHT = 49; //из кода библиотеки
//const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
//const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const SQUARE_SIDE = 40;
const INPUT_WIDTH = Dimensions.get('window').width - SQUARE_SIDE;
const FONT_SIZE = 16;

class ChatRoom extends React.Component {

    messages = null;
    messagesHeight = [];
    lastMessageHeight = 0;

    state = {
        loaded: false,
        connected: true,
        inputHeight: 36,
        KBOffset: 0,
    };

    componentDidMount() {

        //Следим за клавой
        //this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

        //Прокурчиваем сообщения до конца
        /*this.messageList.scrollToIndex({
            animated: false,
            index: this.messages.length,
            viewOffset: 0,
            viewPosition: 1,
        });*/

        //Проверяем соединение с интернетом
        firebase.database().ref(".info/connected")
            .on('value', snapshot => {
                this.setState({connected: snapshot.val()});
            }
        );

        //Проверяем, есть ли уже чат
        //И если он уже есть, то загружаем сообщения
        if(this.props.chats && this.props.chats.key) {
            this.subscribeToMessages (this.props.chats.key);
        }

    }

    componentWillUnmount() {
        //Клава
        //this.keyboardDidShowListener.remove();
        //this.keyboardDidHideListener.remove();
        //База данных
        firebase.database().ref(".info/connected").off();
        firebase.database().ref('chatRooms').off();
    }

    calcOffset = (index) => {
        let offset = 0;
        for (var i = 0; i < index; i++) {
            offset += this.messagesHeight[index];
        }
        return offset;

    };
    /*componentDidUpdate () {
        if (this.messages) {
            const lastIndex = this.messagesHeight.length - 1;
            this.messagesOffset = this.messagesHeight.reduce((ac, e, i) => {
                //Добавляем новый элемент в массив смещений
                const cumHeight = ac[i] + e;
                //Для последнего индекс смещение не требуется
                return i === lastIndex ? ac : (ac.push(cumHeight), ac);
            }, [0]);
            console.log('in CDU');
            console.log('this.messagesHeight');
            console.log(this.messagesHeight);
            console.log('this.messagesOffset');
            console.log(this.messagesOffset);
            this.messageList.scrollToEnd({animated: false});
        }
    }*/

    subscribeToMessages = (chatKey) => {
        firebase.database().ref('chatRooms').child(chatKey).child('messages').orderByChild('timeStamp').on('value', snapshot => {
            const messages = snapshot.val();
           // console.log('in callback');
            //Преобразуем полученные данные в массив сообщений
            const messagesArr = [];
            var i = 0;
            for (var m in messages) {
                messagesArr.push(messages[m]);
                messagesArr[i].key = i;
                i++;
            }
            this.messages = messagesArr;
            //Загрузка завершена
            //console.log('Сообщения загружены');
            this.setState({loaded: true});
        });
    };

    _keyboardDidShow = (e) => {
        /*console.log(this.props.navigation);
        console.log(this.props.navigation.state);
        console.log(e);*/
        //console.log('KB did show firing. Wrong!!!');
        //this.setState({KBHeight: e.height - TAB_BAR_HEIGHT});
        console.log('In _keyboardDidShow', e);
        console.log('DimensionsY:', Dimensions.get('window').height);
    };

    _keyboardDidHide = () => {
        this.setState({KBHeight: 0});
    };

    //Передлать. Исопльзовать индекс вместо push
    _addLayout = (event, index) => {
        this.messagesHeight[index] = event.nativeEvent.layout.height;
    };

    _renderItem = ({item, index}) => {
        return(
            <MessageBlob
                {...item}
                isMine = {item.uid === this.props.uid}
                addLayout = {this._addLayout}
                index = {index}
                />
    )};

    _getItemLayout = (data, index) => ({
        length: this.messagesHeight[index],
        offset: this.calcOffset[index],
        index});

    sendMessage = (text) => {
        let chatKey;
        //Если нет ключа чата, то создаем его
        if(!this.props.chats || !this.props.chats.key) {
            chatKey = firebase.database().ref('chatRooms').push({trainee: this.props.uid}).key;
            this.props.dispatch ({type: 'NEW_CHAT', chatKey: chatKey});
            //Ссылка на чат у юзера
            firebase.database().ref('users/' + this.props.uid).update({chats: chatKey});
            //Подписываемся на обновления
            this.subscribeToMessages (chatKey);
        } else {
            chatKey = this.props.chats.key;
        }
        //Отправляем сообщение
        console.log('sending');
        firebase.database().ref('chatRooms').child(chatKey).child('messages').push({
            timeStamp: new Date().getTime(),
            text: text,
            uid: this.props.uid,
        });
    };

    _containerOnLayout = () => {
        this.containerView.measure((x, y, width, height, pageX, pageY) => this.setState({KBOffset: pageY}));
    };

    render () {

        if (!this.state.KBOffset) {
            return (
                <View
                    ref = {ref => this.containerView = ref}
                    style = {{flex: 1}}
                    onLayout = {this._containerOnLayout}
                    />
            );
        }
        //keyboardVerticalOffset = {this.state.KBOffset}

        return (

            <BcgIMG>
            <KeyboardAvoidingView
                behavior = {'padding'}
                keyboardVerticalOffset = {this.state.KBOffset}
                style = {{flex: 1, justifyContent: 'flex-start'}}
                >
                <View style = {{flex: -1, justifyContent: 'flex-start'}}>
                    <Text style = {{color: 'red'}}>{this.state.connected ? '' : 'Нет соединения с интернетом((('}</Text>
                </View>
                <View style = {{flex: -1, justifyContent: 'flex-start'}}>
                    <Text>{(this.props.chats && this.props.chats.coach) ? 'Чат с тренером :/n' + this.props.chats.coach : null}</Text>
                </View>
                <FlatList
                    ref = {input => this.messageList = input}
                    data = {this.messages}
                    renderItem = {this._renderItem}
                    //getItemLayout = {this._getItemLayout}
                    //onContentSizeChange = {console.log('onContentSizeChange')}
                    //initialScrollIndex = {this.messages ? this.messages.length - 1 : undefined}
                    />

                <NewMessage send = {this.sendMessage}/>
            </KeyboardAvoidingView>
            </BcgIMG>
        );

    }
}

export default connect (state => ({
    chats: state.chats,
    uid: state.user.uid,
}))(ChatRoom);

class NewMessage extends React.Component {

    constructor (props) {
        super (props);
        this.state = {text: ''};
        this.width = Dimensions.get('window').width;
    }

    _onChangeText = text => this.setState({text: text});

    _send = () => {
        //Отправляем
        this.props.send(this.state.text);
        //Очищаем окно ввода сообщений
        this.setState({text: ''});
    };

    render () {

        return (
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={styles.inputBox}
                    multiline={true}
                    onChangeText={this._onChangeText}
                    value={this.state.text}
                    />
                <TouchableOpacity
                    onPress={this._send}
                    style={styles.sendButton}
                    disabled = {!this.state.text}
                    >
                    <Image
                        source={require('Assets/send.png')}
                        resizeMode = {'cover'}
                        />
                </TouchableOpacity>
            </View>
        );
    }
}

function MessageBlob (props) {

    const additionalStyle = props.isMine ? styles.myMessage : styles.theirMessage;

    return(
        <View
            style ={[styles.message, additionalStyle]}
            onLayout = {event => props.addLayout(event, props.index)}
            >
            <Text style = {styles.textUser}>{props.uid}</Text>
            <Text>{props.text}</Text>
            <Text style = {styles.textDate}>{printDate(props.timeStamp)} {printTime(props.timeStamp)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    message: {
        backgroundColor: 'beige',
        width: '80%',
        margin: 2,
        borderRadius: FONT_SIZE / 2,
        borderBottomWidth: 10,
        borderBottomColor: 'beige',
        padding: FONT_SIZE / 2,
    },
    myMessage: {
        alignSelf: 'flex-start',
        borderLeftWidth: 15,
        borderLeftColor: 'transparent',
        //paddingLeft: 4,
    },
    theirMessage: {
        alignSelf: 'flex-end',
        borderRightWidth: 15,
        borderRightColor: 'lightgray',
        paddingRight: 4,
    },
    sendButton: {
        height: SQUARE_SIDE,
        width: SQUARE_SIDE,
        borderRadius: SQUARE_SIDE / 2,
        borderColor: 'dodgerblue',
        borderWidth: 2,
        backgroundColor: 'dodgerblue'
    },
    inputBox: {
        width: INPUT_WIDTH,
        borderColor: 'dodgerblue',
        backgroundColor: 'ivory',
        borderRadius: FONT_SIZE / 2,
        borderWidth: 2,
        fontSize: FONT_SIZE,
    },
    textUser: {
        textAlign: 'left',
        color: 'green',
    },
    textDate: {
        textAlign: 'right',
        color: 'gray',
    },
});
