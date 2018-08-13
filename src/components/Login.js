//import liraries
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet , ImageBackground, TextInput, BackHandler, Text, KeyboardAvoidingView} from 'react-native';
import { FormLabel, FormInput, Header, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { login } from '../actions';


// create a component
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            avatar: '',
            disabled: true,
            bodyText: 'Duo,Takım,Kulüp arıyorsan doğru yerdesin. Hemen sihirdar adını gir ve oyun arkadaşlarını bulmaya başla. GL&HF!',
            copy: '© Copyright Ataberk Dinc',
            logo: 'LoL Mate'
        }
    }

    onUserNameChanged(userName) {
        if (userName && userName.length > 3) {
            this.setState({
                disabled: false,
                username: userName
            });
        } else {
            this.setState({
                disabled: true
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.props.navigation.navigate('Chat');
        }
    }
    onLoginPressed() {
        const { username, avatar } = this.state;
        this.props.login({ username, avatar });
    }

    componentDidMount() {
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
    
      onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        // navigate('NewScreen');
      }
    
      handleBackButton = () => {
        if(this.state.doubleBackToExitPressedOnce) {
          BackHandler.exitApp();
        }
        this.setState({ doubleBackToExitPressedOnce: true });
        setTimeout(() => {
          this.setState({ doubleBackToExitPressedOnce: false });
        }, 2000);
        return true;
      }

    
    showBtnOrSpinner() {
        if (this.props.loading) return <ActivityIndicator />;
        return (
            <Button
                raised
                title='Arkadaşını Bul'
                color="#1C1C1C"
                backgroundColor='#DBBB78'
                disabled={this.state.disabled}
                onPress={this.onLoginPressed.bind(this)}
                
                
            />
        );
    }

    render() {
        return (

           
            <ImageBackground source={require('./back.jpg')}
            style={styles.container}>
         
            <View style={styles.inner}>

            
            <View style={styles.innerl}>
            <Text style={styles.logo}>
                {this.state.logo}
                </Text>
                </View>
                
               


                          <View style={styles.inners}>
                             <Text style={styles.baseText} numberOfLines={5}>
             {this.state.bodyText}
            </Text>

            
            </View>
                <View style={styles.innera}>
                <FormLabel labelStyle={{color: '#ffffff'}}>Sihirdar Adın : </FormLabel>
                <FormInput 
                    
                    inputStyle={{color: '#ffffff'}}
                    placeholder='SKT Faker'
                    placeholderTextColor="#C1CDCD" 
                    onChangeText={(username) => this.onUserNameChanged(username)}
                />

          
                
                
                <View style={styles.btnContainer}>
                    {this.showBtnOrSpinner()}
                </View>

       
            </View>

            <Text style={styles.copy}>
                {this.state.copy}
                </Text>



         
          
            </View>
           
            
            </ImageBackground>
            
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    btnContainer: {
        marginTop: 20,
        
      
    },
    copy: {
        
        
        marginLeft:298,
        color: '#838B8B',
        fontSize:8

    },


    logo: {
       
        marginTop:20,
        color: '#ffffff',
        fontSize:20,
        textAlign: 'center',
    
    },

   

    baseText: {
        
        fontSize: 15,
        color: '#ffffff',
        marginTop: 15,
        marginLeft:20,
        
       
    },
    inner: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,.0)'

    },
    innera: {
        marginTop: 50,
        marginLeft:20,
        width: '90%',
        height: '30%',
        backgroundColor: 'rgba(0,0,0,.4)'


    },
    innerl: {
        marginTop: 60,
        marginLeft:20,
        width: '90%',
        height: '10%',
        backgroundColor: 'rgba(0,0,0,.4)'


    },
    inners: {
        width: '90%',
        height: '13%',
        marginTop: 50,
        marginLeft:20,
        backgroundColor: 'rgba(0,0,0,.4)'

    }
});

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
    };
}
export default connect(mapStateToProps, { login  })(Login);