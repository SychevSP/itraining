import React from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';

import firebase from '/firebaseInit';
import { printDate, printTime } from 'lib/Calendar/utils';
import BcgIMG from 'Components/BcgIMG';
import styles from './styles';

const SQUARE_SIDE = 40;
const INPUT_WIDTH = Dimensions.get('window').width - SQUARE_SIDE;

class ChatRoom extends React.Component {

    messages = null;
    messagesHeight = [];

    state = {
        loaded: false,
        connected: true,
        inputHeight: 36,
        KBOffset: 0,
    };

    componentDidMount() {

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


    subscribeToMessages = (chatKey) => {
        firebase.database().ref('chatRooms').child(chatKey).child('messages').orderByChild('timeStamp').on('value', snapshot => {
            const messages = snapshot.val();

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
            this.setState({loaded: true});
        });
    };


    _renderItem = ({item, index}) => {
        return(
            <MessageBlob
                {...item}
                isMine = {item.uid === this.props.uid}
                //addLayout = {this._addLayout}
                index = {index}
                />
    )};


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

    //account for the header in KeyboardAvoidingView
    //By default the KeyboardAvoidingView asumes there is no other view above it
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
            //onLayout = {event => props.addLayout(event, props.index)}
            >
            <Text style = {styles.textUser}>{props.uid}</Text>
            <Text>{props.text}</Text>
            <Text style = {styles.textDate}>{printDate(props.timeStamp)} {printTime(props.timeStamp)}</Text>
        </View>
    );
}

