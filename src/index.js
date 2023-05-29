import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

const ChatGPT = () => {
    const [data, setData] = useState([]);
    // const apiKey = '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';
    const apiKey = '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'
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
    const [textInput, setTextInpuut] = useState('');

    const handleSend = async () => {
        try{
            const prompt = textInput
            const response = await axios.post(apiUrl, {
                prompt: prompt,
                max_tokens: 1024,
                temperature: 0.5,
            }, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${apiKey}`
                }
            });
            const text = response.data.choices[0].text;
            setData([...data, {text: 'user', 'text' : textInput}, {type: 'bot', 'text': text}]);
            setTextInpuut('');
        }catch (error){
            console.error(error.response.data);
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Chat-APP</Text>
      <FlatList
        data={data}
        keyExtractor={(index) => index.toString()}
        style={styles.body}
        renderItem={({item}) =>(
            <View style={{flexDirection:'row', padding:10}}>
                <Text style={{fontWeight:'bold', color: item.type === 'user' ? 'green' : 'red'}}>
                    {item.type === 'user' ? 'Uttu:' : 'Bot:'}
                </Text>
                <Text style={styles.bot}>
                    {item.text}
                </Text>
            </View>
        )}
      />
      <TextInput
        style={styles.input}
        value= {textInput}
        onChangeText = {text => setTextInpuut(text)}
        placeholder='Ask me anything' 
      />
      <TouchableOpacity
       style={styles.button}
       onPress={handleSend}
       >
        <Text style={styles.buttonText}>Let's  Go</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatGPT


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffcc9',
      alignItems: 'center',
    },
    title: {
       fontSize:28,
       fontWeight: 'bold',
       marginBottom:10,
       marginTop: 70

    },
    body: {
        backgroundColor: '#fffcc9',
        width:'102%',
        margin:10
    },
    bot:{
        fontSize:16
    },
    input:{
        borderWidth:1,
        borderColor:'black',
        width:'90%',
        height:60,
        merginBottom: 10,
        borderRadius:10
    },
    button:{
        backgroundColor: 'yellow',
        width: '90%',
        height:60,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    buttonText :{
        fontSize:25,
        fontWeight:'bold',
        color:'blue',
    }

  });