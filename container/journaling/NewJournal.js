import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    AlertIOS,
    RecyclerViewBackedScrollView,
    TextInput,
    Modal,
    StatusBar,
    NativeModules: {
        ImagePickerManager
        }
    } = ReactNative;
var {
    Platform
    } = require('react-native');
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');
import * as journal from './../../actions/journal';

export default class NewJournal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.data && props.data.title || '',
            date: props.data && props.data.date  && props.data.date.$date && new Date(props.data.date.$date) || new Date(),
            desc: props.data && props.data.desc || '',
            modalVisible: false,
            transparent: false,
            image: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            modalVisible: nextProps.getEmotionForNewEntry,
            transparent: nextProps.getEmotionForNewEntry
        });

        if(nextProps.data.image != this.state.image) {
            this.setState({
                image: nextProps.data.image
            });
        }

    }

    onDone() {

    }

    selectPhotoTapped() {
        const options = {
            title: 'Select Profile Photo',
            takePhotoButtonTitle: 'Take Photo...',
            chooseFromLibraryButtonTitle: 'Choose from Library...',
            quality: 1,
            maxWidth: 300,
            maxHeight: 300,
            storageOptions: {
                skipBackup: false
            },
            allowsEditing: true
        };

        ImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                //this.props.journalAction.saveActivityImage(response.uri, this.props.data.id);
                var source;
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }
                this.setState({
                    image: source
                });
            }
        });
    }

    onDelete() {
        AlertIOS.alert(
            'Confirm Delete',
            'Are you sure you would like to delete this entry?',
            [
                {text: 'DELETE', onPress: () => { this.props.journalAction.deleteJournal({
                    id: this.props.data._id.$oid
                }); this.props.onBack && this.props.onBack(); }, style:'destructive'},
                {text: 'CANCEL', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ]
        );
    }

    emotionSelected(emotion) {
        this.setState({
            emotion: emotion
        });
    }

    saved() {
        if(!this.state.desc) {
            return;
        }
        this.props.data._id && this.props.data._id.$oid?
        this.props.journalAction.editJournal({
            emotion: this.state.emotion,
            title: this.state.title,
            date: this.state.date,
            desc: this.state.desc,
            image: this.state.image,
            id: this.props.data._id && this.props.data._id.$oid
        }):
         this.props.journalAction.createNewJournal({
            emotion: this.state.emotion,
            title: this.state.title,
            date: this.state.date,
            desc: this.state.desc,
            image: this.state.image,
            id: this.props.data._id
        })    

        this.props.onBack && this.props.onBack();
    }

    onCopy() {
        if(!this.state.title || !this.state.desc) {
            return;
        }

        AlertIOS.alert(
            'Copy',
            "Would you like to copy this entry to today's date?",
            [
                {text: 'CONFIRM', onPress: () => this.props.onCopy({
                    emotion: this.state.emotion,
                    title: this.state.title,
                    image: this.state.image,
                    desc: this.state.desc
                }), style: 'destructive'},
                {text: 'CANCEL', onPress: () => console.log('Delete pressed: '), style:'cancel'},
            ]
        );
    }

    render() {
        var modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        var innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff'}
            : null;
        var activeButtonStyle = {
            backgroundColor: '#ddd'
        };

        return (
            <View style={styles.container}>
            <StatusBar barStyle="default" />
                <View style={styles.newJournal}>
                    <View style={styles.title}>
                        <TextInput
                            style={{height: 40, color: 'black', fontSize: 18, marginBottom: 10}}
                            placeholder="Title"
                            placeholderTextColor="grey"
                            onChangeText={(text) => this.setState({title: text})}
                            value={this.state.title}

                        />
                        <Text
                            style={{color: 'orange', fontSize: 14, fontWeight: 'bold'}}
                        >
                            {this.state.date.getDate() + ' ' + this.state.date.toLocaleString("en-us", { month: "long" }) + ' ' + this.state.date.getFullYear()}
                        </Text>
                    </View>
                    <View style={styles.description}>
                        <TextInput
                            style={{height: 150, color: 'black', fontSize: 15, padding: 10}}
                            placeholder="Tell me something"
                            multiline
                            numberOfLines={20}
                            placeholderTextColor="grey"
                            onChangeText={(text) => this.setState({desc: text})}
                            value={this.state.desc}
                        >
                        </TextInput>
                        {
                            this.state.image != "" &&
                            <Image
                                source={this.state.image}
                                style={{height: height * 0.45, width: width * 0.9, alignSelf: 'center'}}
                            />
                        }
                    </View>
                </View>
                <View style= {styles.newJournalFooter}>
                    <View style={styles.bottomPhoto}>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <Image source={require('../../Images/journaling/add-photo-icon.png')} style={styles.photoIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomEditPanel}>
                        <TouchableOpacity style={styles.bottomBtn} onPress={this.onDelete.bind(this)}>
                            <Image source={require('../../Images/journaling/delete-icon.png')} style={styles.deleteIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomBtn} onPress={this.onCopy.bind(this)}>
                            <Image source={require('../../Images/journaling/duplicate-icon.png')} style={styles.duplicateIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this._setModalVisible(false)}}
                >
                    <View style={[styles.modalContainer, modalBackgroundStyle]}>
                        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                            <Text style={{paddingBottom: 10}}>How are you feeling?</Text>
                            <View style={{flexDirection: 'column'}}>
                                <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionSelected.bind(this, '1')}>
                                    <Image source={require('../../Images/journaling/very-happy-entry-icon.png')} style={styles.feelingIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionSelected.bind(this, '2')}>
                                    <Image source={require('../../Images/journaling/happy-entry-icon.png')} style={styles.feelingIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionSelected.bind(this, '3')}>
                                    <Image source={require('../../Images/journaling/neutral-entry-icon.png')} style={styles.feelingIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionSelected.bind(this, '4')}>
                                    <Image source={require('../../Images/journaling/sad-entry-icon.png')} style={styles.feelingIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.feelingBtn} onPress={this.emotionSelected.bind(this, '5')}>
                                    <Image source={require('../../Images/journaling/sad-entry-icon.png')} style={styles.feelingIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                <TouchableOpacity style={styles.notNowBtn} onPress={this.saved.bind(this)}>
                                    <Text style={{fontSize: 14 }}>NOT NOW</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveBtn} onPress={this.saved.bind(this)}>
                                    <Text style={{fontSize: 14, color: 'orange'}}>SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

}

var styles = StyleSheet.create({
    notNowBtn: {
        width: width * 0.25,
        height: height* 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderBottomLeftRadius: 5
    },
    saveBtn: {
        width: width * 0.25,
        height: height* 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderBottomRightRadius: 5
    },
    container: {
        marginTop: 80,
        width: width * 0.999,
        height: height * 0.9,
        backgroundColor: 'white'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        width: width * 0.5,
        borderRadius: 5,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 0
    },
    title: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: 'orange',
        borderBottomColor: 'orange',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10
    },
    description: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    newJournal: {
        height: height - 130,
    },
    newJournalFooter:{
        backgroundColor: '#ededed',
        paddingLeft: 10,
        paddingRight: 10,
    },
    bottomEditPanel: {
        alignSelf: 'flex-end',
        height: 60,
        top: -60,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomPhoto: {
        alignSelf: 'flex-start',
        height: 60,
        justifyContent: 'center'
    },
    bottomBtn: {
        paddingLeft: 10
    },
    footerIcon: {
        height: 44,
        width: 45,
    },
    feelingBtn: {
        padding: 5
    },
    feelingIcon: {
        height: 35,
        width: 35,
    },
    photoIcon: {
      width: width * .10,
      height: height * .042,
        marginLeft: 20,
        marginTop: 0,
        marginBottom: 10,
    },
    deleteIcon: {
        width: width * .05,
        height: height * .04,
        marginLeft: 10,
        //marginTop: 0,
        marginBottom: 10,
        right: width * 0.08
    },
    duplicateIcon: {
      width: width * .08,
      height: height * .045,
        marginLeft: 10,
        marginTop: 0,
        marginBottom: 10,
        right: width * 0.02
       //left: width *.001
    }
});

export default connect(state => ({
    //journal: state.journal,
}), (dispatch) => ({
    journalAction: bindActionCreators(journal, dispatch),
}))(NewJournal);