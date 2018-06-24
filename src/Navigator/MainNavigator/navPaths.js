import DashBoard from 'Screens/DashBoard';
import Calendar from 'Screens/Calendar';
import ChatRoom from 'Screens/ChatRoom';

export default navPaths = {
    Calendar: {
        screen: Calendar,
        navigationOptions: {title: 'События'},
    },
    DashBoard: {
        screen: DashBoard,
        navigationOptions: {title: 'Главная'},
    },
    ChatRoom: {
        screen: ChatRoom,
        navigationOptions: {title: 'Чат'},
    },

};
