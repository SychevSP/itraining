import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { updateProfile } from '/actions';
import Button from '/Components/Button';
import BcgIMG from '/Components/BcgIMG';
import Instruction from '/Components/Instruction';
import { goals, gender, profileProperties } from '/data';
import ProfileEntry from './ProfileEntry';
import { isProfileComplete } from './utils';


const validateInput = (text, inputName) => {
    if (!validation[inputName]) return true;
    if ((text < validation[inputName].min) || (text > validation[inputName].max)) {
        Alert.alert (`В поле ${inputName} следует ввести число от ${validation[inputName].min} до ${validation[inputName].max}`);
        return false;
    }
    return true;
};

class Profile extends React.Component {

    static navigationOptions = {
        headerRight: null,
    };

    constructor (props) {
        super (props);
        this.state = {isChanged: false};

        //get profile from store
        //any changes to the profile will be stored in the state of this component
        //and then flushed to the global state
        const profile = props.profile;
        this.state.profile = {...profile};
    }

    _saveProfile = () => {
        const {navigation} = this.props;
        this.props.dispatch(updateProfile(this.state.profile));
        if (this.props.isProgramActive) {
            navigation.goBack();
        } else {
            navigation.navigate('SelectProgram');
        }
    };

    _updateProfile = (profileProp) => {
        const profile = this.state.profile;
        const newProfile = {...profile, ...profileProp};
        this.setState({
            profile: newProfile,
            isChanged: true,
        });
    };

    instructionText = () => this.state.isNewUser ?
        'ПЕРЕД ИСПОЛЬЗОВАНИЕМ ПРИЛОЖЕНИЯ, ЗАПОЛНИТЕ ДАННЫЕ О СЕБЕ' :
        'ЗДЕСЬ ВЫ МОЖЕТЕ РЕДАКТИРОВАТЬ СВОЙ ПРОФИЛЬ';

    render() {
        const { navigate } = this.props.navigation;

        //console.log('render profile!!');
        //console.log(this.state.profile);

        return (
            <BcgIMG>
                <View style = {{flex: 1}}>
                    <Instruction text = {this.instructionText()}/>
                    {profileProperties.map (e => <ProfileEntry
                        {...e}
                        value = {this.state.profile[e.propName]}
                        updateProfile = {this._updateProfile}
                        />)}
                </View>

                {!this.props.isProgramActive && <Button onPress = {this._saveProfile} text = 'Далее' disabled = {!isProfileComplete(this.state.profile)}/>}
                {this.props.isProgramActive && this.state.isChanged && <Button onPress = {this._saveProfile} text = 'Сохранить изменения'/>}
                {this.props.isProgramActive && <Button onPress = {() => this.props.navigation.goBack()} text = {this.state.isChanged ? 'Выйти без сохранения' : 'Назад'}/>}
            </BcgIMG>
        );
    }
}



export default connect (mapStateToProps)(Profile);

function mapStateToProps (state) {
    return {
        profile: state.profile,
        isProgramActive: state.program.isActive,
    };
}



