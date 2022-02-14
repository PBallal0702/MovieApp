import React from  'react'
import {SafeAreaView,View,TouchableOpacity,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
class Navbar extends React.PureComponent{
    render(){
        const {navigation,main} = this.props
        return(
            <SafeAreaView style={styles.navBarContainer}>
                {!main && (<View style={styles.navBarContainer}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Icon name={'chevron-back'} size={40} color={'black'}/>  
                    </TouchableOpacity>
                </View>)}
                {main && (<View style={styles.navBarContainer}>
                    <TouchableOpacity style={styles.search} onPress={()=>{navigation.navigate('Search')}}>
                        <Icon name={'search-outline'} size={30} color={'black'}/>  
                    </TouchableOpacity>
                </View>)}
            </SafeAreaView>
        )
    }
}
const styles= StyleSheet.create({
    navBarContainer:{
        backgroundColor: 'rgba(0, 0, 0, 0.0)'
    },
    search:{
        alignItems:'flex-end',
        marginRight:15,
        paddingBottom:5,
        paddingTop:5
    }
})
export default Navbar