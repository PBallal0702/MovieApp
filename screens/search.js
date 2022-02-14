import React from 'react'
import { SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity,FlatList, Text,Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {searchMovieTv} from '../Services/apiServices'
import Card from '../components/Card'
class Search extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={inputText:'',searchData:null,navigation:this.props.navigation}
    }
    render(){
        return(
            <SafeAreaView >
                <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(input)=>{this.setState({inputText:input})}}
                        value={this.state.inputText}
                        placeholder={"Search Movies or TV shows"}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.searchIcon} onPress={()=>{ 
                        console.log(this.state.inputText)
                        Promise.all([searchMovieTv(this.state.inputText,'movie'),searchMovieTv(this.state.inputText,'tv')])
                        .then(([movie,tv])=>{
                            var data = [...movie,...tv]
                            this.setState({searchData:data})
                            console.log(this.state.searchData.length)
                        }).catch((error)=>{console.log("Error occur while api",error)})

                    }}>
                        <Icon name={'search-outline'} size={30} color={'black'}/>  
                    </TouchableOpacity>
                </View>
               
                </View>
                <View>
                    {this.state.searchData!=null && this.state.searchData.length >0 &&(
                    <FlatList 
                        data={this.state.searchData} 
                        numColumns={3}
                        renderItem={({item})=><Card navigation ={this.state.navigation}  item={item} />}
                        keyExtractor={item=>item.id}
                    /> )}
                    {this.state.searchData!=null && this.state.searchData.length <=0 &&(
                        <Text>No Result Found</Text>
                    )}
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:20
    },
    container: {
        flexDirection:'row',
        alignItems:'center',
        
    },
    form :{
        flexBasis:'auto',
        flexGrow:1
    },
    searchIcon:{
      margin: 10,
      padding: 5,
    },
    image:{
        height:200,
        width:120,
        borderRadius:20
    }
    
  });
export default Search;