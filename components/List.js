import React from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList} from 'react-native';
import Card from './Card'

class List extends React.PureComponent{
    render(){
        const {title,content,navigation } = this.props
        return(
            <View style ={styles.list}>
                <Text style = {styles.title}> {title}</Text>
                    <FlatList 
                        data={content} 
                        horizontal
                        renderItem={({item})=><Card navigation ={this.props.navigation }  item={item} />}
                    /> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
    list:{
        marginTop:20
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        paddingBottom:20
    }
})
export default List;