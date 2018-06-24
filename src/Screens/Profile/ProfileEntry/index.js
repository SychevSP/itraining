import React from 'react';
import { Text, View, TouchableOpacity, Modal, Platform } from 'react-native';

import * as ModalInput from './Modal';
import styles from './styles';

export default class extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            isModalVisible: false,
            candidateValue: props.value,
        };

        //Choose input type
        this.InputView = null;
        switch (props.input ) {
            case 'numeric':
                this.InputView = ModalInput.NumericInput;
                break;
            case 'picker':
                this.InputView = ModalInput.Picker;
                break;
            case 'date':
                this.InputView = Platform.OS === 'ios' ? ModalInput.DateInput : ModalInput.NumericInput;
                break;
        }

    }

    toggleModal = () => this.setState({isModalVisible: !this.state.isModalVisible});

    onChange = (candidateValue) => {
        this.setState({candidateValue})
    };

    //update state and close the modal
    updateProfile = () => {
        const {propName} = this.props;
        this.props.updateProfile({[propName]: this.state.candidateValue});
        this.toggleModal();
    };

    render() {

        const props = this.props;
        const InputView = this.InputView;

        return (
            <View style={styles.mainVew}>
                <View style={[styles.rect, styles.name]}>
                    <Text style={styles.text}>{props.name}</Text>
                </View>
                <TouchableOpacity onPress={this.toggleModal} style={[styles.rect, styles.input]}>
                    <Text style={styles.text}>{props.value}</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={this.toggleModal}>
                    <View style={styles.modalBackground}>
                        <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress = {this.toggleModal}>
                                <Text style = {styles.text}>Отмена</Text>
                            </TouchableOpacity>
                            <View style = {{flex: 1}}/>
                            <TouchableOpacity onPress = {this.updateProfile}>
                                <Text style = {styles.text}>Ок</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style = {styles.text}>{this.props.name}</Text>
                        <InputView
                            value = {this.props.value}
                            onChange = {this.onChange}
                            onOK = {this.updateProfile}
                            options = {this.props.options}
                            />

                    </View>
                </Modal>



            </View>
        );
    }
}


/*

 */