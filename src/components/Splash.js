//import liraries
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { loggedIn } from '../actions';

// create a component
class Splash extends Component {

    componentDidMount(){
        AsyncStorage.getItem('user_info')
            .then(user => {
                if (user) {    
                    const userObject = JSON.parse(user);
                    this.props.loggedIn(userObject);
                }else {
                    this.props.navigation.navigate('Login');
                }
            });
            
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.props.navigation.navigate('Chat');
        }
    }
    
    render() {
        return (
            <ImageBackground source={require('./back.jpg')}
            style={styles.container}>
            
            <View style={styles.container}>
                

             
                    
                    {this.props.children}
                    
            
                <ActivityIndicator size='large' color='#DBBB78' />

              
            </View>
            </ImageBackground>
        );
    }
}

// define your styles
const styles = StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
});

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps, { loggedIn })(Splash);