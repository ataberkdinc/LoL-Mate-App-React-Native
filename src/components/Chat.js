import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, 
    Platform, Keyboard,ActivityIndicator,
    TouchableHighlight, KeyboardAvoidingView, BackHandler, ImageBackground } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { sendMessage, fetchMessges } from '../actions';


import ChatItem from './ChatItem';

// create a component
class Chat extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            disabled: true
        }
    }
    
    
      componentDidMount() {

        this.props.fetchMessges();
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

    

    onTyping(text) {
       if (text && text.length >= 2 ) {
           this.setState({
               disabled: false,
               text
           });
       } else {
           this.setState({
               disabled: true
           })
       }
    }

    onSendBtnPressed () {
        this.props.sendMessage(this.state.text, this.props.user);
        this.textInput.clear();
        // Keyboard.dismiss();
    }

    showListOrSpinner() {
        if (this.props.fetching) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        return (
            <FlatList
                inverted
                data={this.props.messages}
                renderItem={this.renderChatItem}
                keyExtractor={this.keyExtractor}
            />
        );
    }

    renderChatItem({ item }) {
        return <ChatItem message={item} />
    }

    // keyExtractor = (item, index) => index;
    keyExtractor = (item, index) => `key-${index}`;

    render() {
        const extraBtnStyle = this.state.disabled ? styles.disabledBtn : styles.enabledBtn;
        let behavior = '';
        if (Platform.OS == 'ios')  {
            behavior = 'padding'
        }
        return (
           <ImageBackground source={require('./chat.jpg')}
           style={styles.container}>
            <View style={styles.container}>
                <Header
                    outerContainerStyles={{ backgroundColor: '#3888CE'}}
                    centerComponent={{ text: 'LoL Mate', style: { color: '#ffffff', fontSize: 20 } }}
                />
                { this.showListOrSpinner () }

           
                <KeyboardAvoidingView behavior={behavior}>
                    <View style={styles.inputBar}>
                        
                        <TextInput 
                            style={styles.textBox} 
                            multiline
                            onChangeText={(text) => this.onTyping(text)}
                            ref={input => { this.textInput = input; } }
                        />

                        <TouchableHighlight 
                            style={[styles.sendBtn, extraBtnStyle ]}
                            disabled={this.state.disabled}
                            onPress={this.onSendBtnPressed.bind(this)}
                            
                            
                        >
                            <Text style={{ color: '#fff'}}>Send</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
                
 


            </View>
            </ImageBackground>
       
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
        
    },
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#dadfea'
    },
    textBox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 14,
        paddingHorizontal: 10,
        flex: 1,
        paddingVertical: 5,
        marginLeft: 5
    },
    
    sendBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginLeft: 5
    },
    enabledBtn: {
        backgroundColor: '#3888CE'
    },
    disabledBtn: {
        backgroundColor: '#828282'
    }
});

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        fetching: state.chat.fetching,
        messages: state.chat.messages
    }
}

//make this component available to the app
export default connect(mapStateToProps, { sendMessage, fetchMessges } )(Chat);