import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
class Card extends React.PureComponent{
    render(){
        const {item,navigation} = this.props;
        return(
            <View>
                <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{movieId:item.id})}} style={styles.container}>
                    <Image
                     resizeMode='cover'
                     style={styles.image}
                     source={{uri:'https://image.tmdb.org/t/p/w500'+item.poster_path}}
                     />
                     
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        padding:5,
        position:'relative'
    },
    image:{
        height:200,
        width:120,
        borderRadius:20
    }
})
export default Card