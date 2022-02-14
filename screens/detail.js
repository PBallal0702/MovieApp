import React from 'react'
import {View,Image,StyleSheet,Dimensions, ActivityIndicator, Text,ScrollView} from 'react-native'
import {getMovieDetail} from '../Services/apiServices'
import StarRating from 'react-native-star-rating';
 
class Detail extends React.PureComponent{
    constructor(props){
        super(props)
        const {route , naviation} = this.props
        this.state ={movieId:route.params.movieId,loaded:false,detailData:{}}
        getMovieDetail(this.state.movieId)
        .then((movieData)=>{
            console.log(movieData)
            this.setState({detailData:movieData})
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            this.setState({loaded:true})
        })
    }
    render(){
        return(
            <ScrollView>
                    {this.state.loaded &&(
                    <View>
                        <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{uri:'https://image.tmdb.org/t/p/w500'+this.state.detailData.poster_path}}
                        />
                        <View style={styles.viewContainer}>
                            <Text style={styles.title}>{this.state.detailData.title}</Text>
                            {this.state.detailData.genres && (<View style={styles.generContainer}>
                                {
                                    this.state.detailData.genres.map((genre)=>{
                                        return <Text style={styles.genreText}>{genre.name}</Text>
                                    })
                                }
                                
                            </View>
                            )}
                            <View style={styles.rattingContainer}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={this.state.detailData.vote_average/2}
                                    fullStarColor={'gold'}
                                    starSize={30}
                                />
                            </View>
                            <Text style={styles.overview}>{this.state.detailData.overview}</Text>
                            <Text style={styles.releaseDate}>Release Date:- {this.state.detailData.release_date}</Text>
                        </View>
                    </View>
                )}
                
                {!this.state.loaded && (
                    <View style={[styles.container,styles.horizontal]}>
                    <ActivityIndicator size="large" color="#00ff00"/>
                    </View>
                )}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
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
      },
    image:{
        height:Dimensions.get('screen').height/2.7,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:10
    },
    viewContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    generContainer:{
        flexDirection:'row',
        alignContent:'center',
        marginTop:10
    },
    genreText:{
        marginRight:10,
        marginLeft:5,
        fontWeight:'bold'
    },
    rattingContainer:{
        marginTop:20
    },
    overview:{
        padding:15
    },
    releaseDate:{
        fontWeight:'bold'
    }
})
export default Detail