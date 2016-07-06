
import {AsyncStorage} from 'react-native';
import {JOURNALS_RECEIVED_SUCCESS, SAVE_ACTIVITY_IMAGE_SUCCESS, USER_AVATAR_SAVE_SUCCESS, EDIT_JOURNAL_SUCCESS, DELETE_JOURNAL_SUCCESS, FILTER_JOURNAL_FEELING_SUCCESS, FILTER_JOURNAL_DATE_SUCCESS, FILTER_JOURNAL_TEXT_SUCCESS} from './../constants';
import {createRequest} from './../common/utils';
var {
    Platform
    } = require('react-native');
import _ from 'underscore';
import moment from 'moment';

let data = ["http://localhost:9000/zsp/journal/"];

    function fetchJournals(dispatch){
        fetch(data + 'getDetails/57673487e78a00895541615d', {
             method: 'get',
             headers: {
               'Content-Type': 'application/json',
               'Cache-Control': 'no-cache'
             }
           })
        .then((response) => response.json())
        .then((responseText) => {
                let data = responseText.journals;  
                console.log('response = '+JSON.stringify(data,null,4))
                    data = _.sortBy(data, function(o) { return o.date.$date; });
                    data = data.reverse();
                    console.log(data);
                    dispatch({
                    type: JOURNALS_RECEIVED_SUCCESS,
                    payload: data //+ 'getDetails/57673487e78a00895541615d'
                }) 
                        console.log(data);                
             })
        .catch((error) => {
         console.warn(error);
        });   

        }   


    // {
    //     id: 0,
    //     feeling:"veryhappy",
    //     date:new Date(2016, 2, 22),
    //     title:"Great day at the park",
    //     desc:"Went to a concert with friends today, it was good to catch up. I haven’t seen them in sooo long! ...."
    // },
    // {
    //     id: 1,
    //     feeling:"veryhappy",
    //     date:new Date(2016, 2, 30),
    //     title:" day at the park",
    //     desc:"He was Went to a concert with friends today, it was good to catch up. I haven’t seen them in sooo long! ...."
    // },
    // {
    //     id: 2,
    //     feeling:"veryhappy",
    //     date:new Date(2016, 1, 23),
    //     title:" day at the park",
    //     desc:"Went to a concert with friends today, it was good to catch up. I haven’t seen them in sooo long! ...."
    // },
    // {
    //     id: 3,
    //     feeling:"sad",
    //     date:new Date(2016, 1, 26),
    //     title:" day at the park",
    //     desc:"Went to a concert with friends today, it was good to catch up. I haven’t seen them in sooo long! ...."
    // },
    // {
    //     id: 4,
    //     feeling:"happy",
    //     date:new Date(2015, 1, 23),
    //     title:"Great day at the park",
    //     desc:"Went to a concert with friends today, it was good to catch up. I haven’t seen them in sooo long! ...."
    // },
    // {
    //     id: 5,
    //     feeling:"neutral",
    //     date:new Date(2015, 1, 2),
    //     title:"Great day at the park",
    //     desc:"Went to a concert with friends today, it was good to catch up. I haven’t seen them in sooo long! ...."
    // },
// ];

module.exports = {
    // saveActivityImage(avatarUri, id) {
    //     return dispatch => {
    //         // You can display the image using either:
    //         //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
    //         var source;
    //         if (Platform.OS === 'android') {
    //             source = {uri: avatarUri, isStatic: true};
    //         } else {
    //             source = {uri: avatarUri.replace('file://', ''), isStatic: true};
    //         }
    //         let journal = _.find(data, jour => {
    //             return jour.id==id;
    //         });
    //         journal.image = source;
    //         dispatch({
    //             type: JOURNALS_RECEIVED_SUCCESS,
    //             payload: data
    //         })
    //     }
    //},
    getJournals() {
        return dispatch => {
            fetchJournals(dispatch)
        }
//             fetch(data + 'getDetails/57673487e78a00895541615d', {
//          method: 'get',
//          headers: {
//            'Content-Type': 'application/json',
//            'Cache-Control': 'no-cache'
//          }
//        })
//             .then((response) => response.json())
//             .then((responseText) => {
//                     let data = responseText.journals;  
// //                    console.log('response = '+JSON.stringify(data,null,4))
//                     //console.log(data[0].title); 
//                     //var date = new Date(data[0].date.$date);
//                     //console.log(date);
//                          //for (i=0;i<data.length;i++){
//                             //data= data[i];
//                             //var feeling = data.feeling;
//                             //console.log(feeling);

//                             //let responseDate = data.date.$date;

//                             //date=new Date(responseDate)
//                             //date = new Date(data.date);
//                             //console.log('formattedDate='+date);

//                           //  data = _.sortBy(data, 'date');
//                         //    data = data.reverse();
                      
//                             //getData = _.sortBy(getData, 'date');
//                             //getData = getData.reverse();
                    
//                     // }
//                         data = _.sortBy(data, function(o) { return o.date.$date; });
//                         data = data.reverse();
//                         console.log(data);
//                         dispatch({
//                         type: JOURNALS_RECEIVED_SUCCESS,
//                         payload: data //+ 'getDetails/57673487e78a00895541615d'
//                     }) 
//                             console.log(data);                
//                  })
//                 // debugger;
//                 // console.log(responseText);
//                 // var i;
//                 // var a= responseText.journals[i];
//                // console.log("date",responseText.journals);
//                 //console.log("date",a[].desc);
//                 // for()
//              // console.log(res);
//              // var dhr= res.journals;
//              // console.log(dhr);
//              // for (i=0;i<dhr.length;i++){
//              //    var b= dhr[i].title;
//              // }
//              // console.log(b);
//              //console.log(journals.title);
//               //console.log(responseText.JWTTOKEN);
              

//               // for(var i=0;i<a.length;i++){
//               //   alert("in loop");
//               //   // var b= a[i].title;
//               //                 console.log(responseText);
//               // }

             
//                 // var a = responseText.journals;
//                 // for (i=0;i<a.length;i++){
//                 //     var b= a[i];
//                 //     console.log(b);
//                 // }
//  // this.setState({
//  //                showRedirectScreen: true
//  //              });
        
//             // AlertIOS.alert(
//             //                "GET",
//             //                "Desc -->"+  responseText.journals[1].title
//             //                );

          

//             .catch((error) => {
//              console.warn(error);
//             });
// this.setState({
//                 showRedirectScreen: true
//               });

            

            
//         }
    },
    createNewJournal(newEntry) {
        return dispatch => {
            // var source;
            // console.log('newEntry.image::', newEntry.image);
            // if (Platform.OS === 'android') {
            //     source = {uri: newEntry.image, isStatic: true};
            // } else {
            //     source = {uri: newEntry.image.replace('file://', ''), isStatic: true};
            // }
            fetch(data + 'save', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                
                user: "57673487e78a00895541615d",
                feeling: newEntry.emotion,
                date: newEntry.date,
                title: newEntry.title,
                desc: newEntry.desc,
                id: data.length

                // "user":"57645011e78a006c85d9e2cc",
                // "title":"new entry",
                // "desc":"new desc",
                // "feeling":"3"
          })
        })

            .then((response) => response.text())
            .then((responseData) => {
                        console.log(responseData);               
                //   dispatch({
                //     type: JOURNALS_RECEIVED_SUCCESS,
                //     payload: data + 'save'
                // }) 
              
             
            })        


            // data.push({
                // user:'57645011e78a006c85d9e2cc',
                // feeling: newEntry.emotion,
                // title: newEntry.title,
                // desc: newEntry.desc,

            //     feeling: newEntry.emotion,
            //     date: newEntry.date,
            //     title: newEntry.title,
            //     desc: newEntry.desc,
            //    //image: newEntry.image,
            //     //id: data.length

            // });
                      //data = _.sortBy(data, "date");
            //data = data.reverse();
          
            fetchJournals(dispatch)
        }   

    },
    editJournal(editEntry) {
        return dispatch => {
            // let entry = _.find(data, journal => {
            //     return journal.id == editEntry.id;
            // });
            // _.extend(entry, editEntry);
            // data = _.sortBy(data, "date");
            // data = data.reverse();
            // dispatch({
            //     type: JOURNALS_RECEIVED_SUCCESS,
            //     payload: data
            // })
          fetch(data + 'update', {
             method: 'post',
             headers: {
               'Content-Type': 'application/json'
             },
            body: JSON.stringify({
                user: "57673487e78a00895541615d",
                journalId:editEntry.id,
                feeling: editEntry.emotion,
                title: editEntry.title,
                desc: editEntry.desc,
             })
            })
        .then((response) => response.json())
        .then((responseText) => {
                console.log(responseText)
                fetchJournals(dispatch)            
             })
        .catch((error) => {
         console.warn(error);
        });   
        }
    },
    deleteJournal(deleteEntry) {
        return dispatch => {
            // data = _.filter(data, journal => {
            //     return journal.id != deleteEntry.id;
            // });
            // data = _.sortBy(data, "date");
            // data = data.reverse();
            // dispatch({
            //     type: JOURNALS_RECEIVED_SUCCESS,
            //     payload: data
            // })
           fetch(data + 'delete', {
             method: 'post',
             headers: {
               'Content-Type': 'application/json'
             },
            body: JSON.stringify({
                user: "57673487e78a00895541615d",
                journalId:deleteEntry.id
             })
            })
        .then((response) => response.json())
        .then((responseText) => {
                console.log(responseText)
                fetchJournals(dispatch)            
             })
        .catch((error) => {
         console.warn(error);
        });       
        }
    },
    filterJournalsFeeling(feeling) {
        return dispatch => {
            let data2 = _.filter(data, journal => {
                return journal.feeling == feeling;
            });
            data2 = _.sortBy(data2, 'date');
            data2 = data2.reverse();
            dispatch({
                type: JOURNALS_RECEIVED_SUCCESS,
                payload: data2
            })
        }
    },
    filterJournalsDate(date) {
        return dispatch => {
            let data2 = _.filter(data, journal => {
                return moment(journal.date).format('MM-DD-YYYY') == moment(date).format('MM-DD-YYYY');
            });
            data2 = _.sortBy(data2, 'date');
            data2 = data2.reverse();
            dispatch({
                type: JOURNALS_RECEIVED_SUCCESS,
                payload: data2
            })
        }
    },
    filterJournalsText(searchText="") {
        return dispatch => {
            let data2 = _.filter(data, journal => {
                return ( (journal.desc && journal.desc.toLowerCase().indexOf(searchText.toLowerCase()) != -1) ||
                        (journal.title && journal.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1));
            });
            data2 = _.sortBy(data2, 'date');
            data2 = data2.reverse();
            dispatch({
                type: JOURNALS_RECEIVED_SUCCESS,
                payload: data2
            })
        }
    }
};
