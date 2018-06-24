import Profile from '../Screens/Profile';
import SelectProgram from '../Screens/SelectProgram';
import ProgramOverview from '../Screens/ProgramOverview';
import ProgramDetails from '../Screens/ProgramDetails';
import Input from '../Screens/Input';
import Schedule from '../Screens/Schedule';
import ChatRoom from '../Screens/ChatRoom';
import MainNavigator from './MainNavigator';

export default navPaths = {
    Profile: { screen: Profile,
        navigationOptions: {title: 'Профиль'},
    },
    SelectProgram: { screen: SelectProgram,
        navigationOptions: {title: 'Выбор программы'},
    },
    Input: { screen: Input ,
        navigationOptions: {title: 'Вводные данные'},
    },
    ChatRoom: { screen: ChatRoom,
        navigationOptions: {title: 'Сообщения'},
    },
    Schedule: { screen: Schedule,
        navigationOptions: {title: 'Выбор расписания'},
    },
    ProgramOverview: {screen: ProgramOverview,
        navigationOptions: {title: 'Ваша программа'},
    },
    ProgramDetails: {screen: ProgramDetails,
        navigationOptions: {title: 'Тренировка'},
    },
    MainNavigator: {screen: MainNavigator},
};
