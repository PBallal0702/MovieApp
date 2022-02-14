import React from 'react';
import {ActivityIndicator, View,Text,StyleSheet,Dimensions,ScrollView} from 'react-native';
import {getUpcomingMovies, getPopularMovies, getPopularTV} from '../Services/apiServices';
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List'
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {moviesImagesState:[], error:false,popularMovies:{},popularTvs:[],loaded:false};
        const getData = ()=>{
            return (Promise.all([
                getUpcomingMovies(),
                getPopularMovies(),
                getPopularTV()
            ]))
        }

        getData()
        .then(([UpcomingMovies,popularMovies,popularTv])=>{
            moviesImages = [];
            UpcomingMovies.forEach(movie => {
                moviesImages.push('https://image.tmdb.org/t/p/w500'+movie.poster_path)
            }); 
            this.setState({moviesImagesState:moviesImages})
            this.setState({popularMovies:popularMovies})
            this.setState({popularTvs:popularTv})
            
        })
        .catch(error=>{
            this.setState({error:true})
            console.log(error)
        })
        .finally(()=>{
            this.setState({loaded:true})
        })
    }
    render(){
        return(
           <View>
               {this.state.loaded && !this.state.error &&(<ScrollView>
                <View>
                    <SliderBox sliderBoxHeight = {Dimensions.get('screen').height/1.7} autoplay={true} circleLoop ={true} dotStyle ={style.imageSlider} images={this.state.moviesImagesState} />
                    {this.state.error && <Text style={{color:'red'}}>Internal Server Error</Text>}
                </View>
                <View >
                    <List title = "Popular Movies" content = {this.state.popularMovies} navigation ={this.props.navigation } />
                </View>
                <View >
                    <List title = "Popular TV" content = {this.state.popularTvs} navigation ={this.props.navigation }  />
                </View>
                </ScrollView>)}
                {!this.state.loaded && !this.state.error &&(
                    <View style={[style.container,style.horizontal]}>
                        <ActivityIndicator size="large" color="#00ff00"/>
                    </View>
                )}
                {this.state.loaded && this.state.error &&(
                    <View style={[style.container,style.horizontal]}>
                        <Text>
                            Oops Something went Wrong 
                            Please make sure you are conneted to Internet or There
                            is Internal Server Error
                        </Text>
                    </View>
                )}
           </View>

        )
    }
}
const style = StyleSheet.create({
    imageSlider:{
        height:0,
    },
    carousole:{
        flex:1,
        justifyContent:'center'
    },
    container: {
        flex: 1,
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        justifyContent: "center",
        alignItems:"center",
        height:Dimensions.get('screen').height/1.3
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }

})
export default Home;