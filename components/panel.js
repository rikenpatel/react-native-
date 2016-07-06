import React,{Component,StyleSheet,Text,View,Image,TouchableHighlight,Animated, Dimensions} from 'react-native';
var {height, width,left, right, marginLeft, marginTop, marginRight, marginBottom, alignSelf,fontSize, fontWeight, flexDirection} = Dimensions.get('window');
class Panel extends Component{
    constructor(props){
        super(props);

        this.icons = {  
            'up'    : require('./../Images/safetyplan/disclosure-indicator-up.png'),
            'down'  : require('./../Images/safetyplan/disclosure-indicator-down.png'),
            '1UnSelect': require('./../Images/safetyplan/1Select.png'),
            '1Select': require('./../Images/safetyplan/1UnSelect.png')
        };

        this.state = {
            title       : props.title,
            expanded    : true,
            animation   : new Animated.Value()
        };
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    render(){
        let icon = this.icons['down'];
        let icon1 = this.icons['1Select'];

        if(this.state.expanded){
            icon = this.icons['up'];
            icon1 = this.icons['1UnSelect'];
        }

        return (
            <Animated.View 
                style={[styles.container,{height: this.state.animation}]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <View>
                    <Image
                            style={styles.numbImage}
                            source={icon1}
                        >   
                        </Image>
                        </View>
                        <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="transparent">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        >   
                        </Image>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>


            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        backgroundColor: 'transparent',
        //margin:10,
        overflow:'hidden',
        //width: 350,
        //alignSelf: 'center',
        //borderRadius: 10
    },
    titleContainer : {
        flexDirection: 'row',
        height: height * 0.15
        
    },
    title       : {
        //flex    : 1,
        color   :'transparent',
        //alignSelf: 'center',
        left: 10,
        top: 30,
        bottom: 0,
        right: 0,
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
        height: 100,
        fontWeight: "500"
    },
    button      : {
        height: 100,
        width: 100
    },
    buttonImage : {
        top: 40,
        //marginRight: width * 0.05,
        right: 20,
        //alignSelf: 'center',
        width : width * .05,
        height: height *.015,
        position: 'absolute'

    },
    numbImage: {
        // //marginTop: height * 0.02,
        // //marginRight: width * 0.05,
         left: 0,
         top: 0,
        // bottom: 0,
        // //padding: 0,
        // //alignSelf: 'center',
        width : width * .2,
        height: height *.15,
        borderRadius: 10
        
    },
    body        : {
        padding: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        //height: 100
    }
});

export default Panel;