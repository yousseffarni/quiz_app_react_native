import React,{useState} from 'react';
import {
View,Text,
Modal,SafeAreaView,
StatusBar,TouchableOpacity,
ScrollView
} from 'react-native';
import { COLORS} from '../constants';
import data from '../data/QuizData'
//import MaterialCommmunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Quiz = () => {

    const AllQuestions = data;
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
    const [currentAnswerSelected,setCurrentAnswerSelected] = useState(null);
    const [CorrectAnswer,setCorrectAnswer] = useState(null);
    const [isAnswerDisabled,setIsAnswerDisabled] = useState(false);
    const [showSuivantButton,setShowSuivantButton] = useState(false);
    const [Score,setScore] = useState(0);
    const [ShowScoreModal,setShowScoreModal] = useState(false);
    const [TimeLeft,setTimeLeft] = useState(0);
    const [StartQuiz,setStartQuiz] = useState(false);

    const validateAnswer = (answer) =>{
        let Correct_Answer = null;
        AllQuestions[currentQuestionIndex].answers.forEach((AnswerItem) => {
            if(AnswerItem.correct==true){
               Correct_Answer = AnswerItem;
            }
        });

        setCurrentAnswerSelected(answer);
        setCorrectAnswer(Correct_Answer);
        setIsAnswerDisabled(true);
        if(answer==Correct_Answer){
            setScore(Score+1);
        }
        setShowSuivantButton(true);
        setTimeLeft(0); 
    }

    if(StartQuiz){
        let CounteDownTime = AllQuestions[currentQuestionIndex].time;
        if(TimeLeft < CounteDownTime){
          for(let i=0; i<CounteDownTime; i++){
            setTimeLeft(i);  
          }
        }else{
          setCurrentQuestionIndex(currentQuestionIndex+1);  
          setTimeLeft(0);  
        }
    }
    
    const renderQuestion = () =>{
       return(
        <View style={{
            flexDirection:'column',
            justifyContent:'center',
        }}>
            <View style={{
                backgroundColor:COLORS.primary,
                flexDirection:'column',
                justifyContent:'flex-end',
                alignItems:'center',
                paddingVertical:60,width:'100%',
                paddingTop:70,borderBottomEndRadius:15,
                borderBottomStartRadius:15,shadowColor:COLORS.black,
                shadowOffset:{width:0,height:15},
                boxWithShadow: {
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 1, 
                }
            }}>
                <View style={{
                  flexDirection:'row',
                  justifyContent:'space-around',
                  alignItems:'center'
                }}>
                

                   <View style={{
                     flexDirection:'column',
                     justifyContent:'space-between',
                     paddingRight:20
                   }}>
                      <Text style={{
                          color:COLORS.white,fontSize:30,fontWeight:'bold'
                      }}>Hi, Youssef Farni</Text>
                      <Text style={{
                          color:'#1c4a8c',fontSize:15,
                      }}>Bienvenue Dans Le Quiz!</Text>
                   </View>

                   <Text style={{
                        color:COLORS.gray,fontSize:30,fontWeight:'bold',
                        padding:10,backgroundColor:COLORS.white,borderRadius:10
                    }}>👤</Text>
               </View>
              <View style={{
               flexDirection:'row',
               justifyContent:'space-around',
               alignItems:'center',width:'80%',
               backgroundColor:COLORS.white,
               paddingHorizontal:15,paddingVertical:10,
               borderRadius:10,position:'absolute',top:150,
               borderColor:COLORS.primary,borderWidth:1,
               boxWithShadow: {
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1, 
               }
              }}>
                <View style={{
                   flexDirection:'column',
                   justifyContent:'center',
                   alignItems:'center'
                }}>
                 <Text style={{
                   color:COLORS.black,fontSize:15,paddingBottom:5
                 }}>Question</Text>  
                 <View style={{ 
                     flexDirection:'row',
                     alignItems:'center',padding:10,
                     justifyContent:'center',
                     backgroundColor:'#1c4a8c',
                     width:70,textAlign:'center',borderRadius:5,
                  }}>
                     <Text style={{
                         color:COLORS.white,fontSize:20,opacity:0.6,marginRight:2,fontWeight:'bold'
                      }}>{currentQuestionIndex+1}</Text>
                     <Text style={{
                         color:COLORS.white,fontSize:18,opacity:0.6,marginRight:2,fontWeight:'bold'
                      }}>/{AllQuestions.length}</Text>
                 </View>
                </View>
                <View style={{
                   flexDirection:'column',
                   justifyContent:'center',
                   alignItems:'center'
                }}>
                  <Text style={{
                    color:COLORS.black,fontSize:15,paddingBottom:5
                  }}>Temps écoulé</Text>  
                  <View style={{
                     flexDirection:'row',
                     justifyContent:'space-between',
                     alignItems:'center'
                  }}>
                    <View style={{ 
                      flexDirection:'row',
                      alignItems:'center',padding:10,
                      justifyContent:'center',
                      backgroundColor:'#1c4a8c',
                      width:50,textAlign:'center',borderRadius:5,
                      marginRight:5
                     }}>
                       <Text style={{
                        color:COLORS.white,fontSize:20,opacity:0.6,marginRight:2,fontWeight:'bold'
                       }}>05</Text>
                    </View> 
                    <View style={{ 
                       flexDirection:'row',
                       alignItems:'center',padding:10,
                       justifyContent:'center',
                       backgroundColor:'#1c4a8c',
                       width:50,textAlign:'center',borderRadius:5,
                      }}>
                       <Text style={{
                        color:COLORS.white,fontSize:20,opacity:0.6,marginRight:2,fontWeight:'bold'
                       }}>08</Text>
                    </View>
                  </View>
                </View>
              </View>
           </View>

           <View style={{
               paddingTop:80,
               paddingHorizontal:15
           }}>
             <Text style={{
               color:COLORS.black,fontSize:20,
             }}>Question {currentQuestionIndex+1}</Text>
             <Text style={{
                color:COLORS.gray,fontSize:15,
             }}>{AllQuestions[currentQuestionIndex]?.label}</Text>  
           </View>
           
        </View>   
       )
    }

    const HandleSuivantButton = () =>{
        if(currentQuestionIndex == AllQuestions.length-1){
        setShowScoreModal(true);
        setCurrentAnswerSelected(null);
        setCorrectAnswer(null);
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentAnswerSelected(null);
            setCorrectAnswer(null);
            setIsAnswerDisabled(false);
            setShowSuivantButton(false);
        }
    }

    

    const renderAnswers = () =>{
        return (
            <View style={{
                paddingHorizontal:10,
            }}>
              {
                AllQuestions[currentQuestionIndex]?.answers.map((answer) =>{
                    return(
                    <TouchableOpacity 
                     onPress={()=>validateAnswer(answer)}
                     disabled={isAnswerDisabled}
                     key={answer.id}
                     style={{
                        borderWidth:2,
                        borderColor: answer==CorrectAnswer 
                        ? COLORS.success : answer==currentAnswerSelected 
                        ? COLORS.error   : COLORS.primary,
                        backgroundColor: answer==CorrectAnswer 
                        ? COLORS.success+'20': answer==currentAnswerSelected 
                        ? COLORS.error+'20'  : COLORS.secondary,
                        flexDirection:'row',
                        height:60,borderRadius:20,
                        alignItems:'center',justifyContent:'space-between',
                        paddingHorizontal:20,marginVertical:10
                     }}
                    >
                        <Text style={{fontSize:20,color: COLORS.black}}>{answer.label}</Text>
                        {
                            answer==CorrectAnswer?(
                                <View style={{
                                    width:30,height:30,borderRadius:30/2,
                                    justifyContent:'center',alignItems:'center'
                                }}>
                                    <Text style={{fontSize:20}}>✅</Text>
                                    {/*<MaterialCommmunityIcons name="check" style={{color:COLORS.white,fontSize:20}}/>*/}
                                </View>
                            ):answer==currentAnswerSelected?(
                                <View style={{
                                    width:30,height:30,borderRadius:30/2,
                                    justifyContent:'center',alignItems:'center'
                                }}>
                                    <Text style={{fontSize:20}}>❌</Text>
                                    {/*<MaterialCommmunityIcons name="close" style={{color:COLORS.white,fontSize:20}}/>*/}
                                </View>
                            ):null
                        }
                    </TouchableOpacity>
                    )
                })
              }
            </View>
        )
    }

    const renderSuivatButton = () => {
 
        if(showSuivantButton){
            return(
              <View style={{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',paddingHorizontal:50,  
              }}>
                <TouchableOpacity 
                onPress={HandleSuivantButton}
                style={{
                    marginTop:30,width:'100%',
                    backgroundColor:COLORS.accent,
                    padding:15,borderRadius:50,
                }}>
                    <Text style={{
                        fontSize:20,
                        color:COLORS.white,
                        textAlign:'center'
                    }}>Suivant</Text>
                </TouchableOpacity>  
              </View>
            )
        }else{
            return null;
        }
    }

    const RestartQuiz = () =>{
        setShowScoreModal(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentAnswerSelected(null);
        setCorrectAnswer(null);
        setIsAnswerDisabled(false);
        setShowSuivantButton(false); 
    }

  return (
    <SafeAreaView style={{flex:1}}>
        <StatusBar 
         barStyle='light-content' 
         backgroundColor={COLORS.white}
        />
        <View style={{
            flex:1,
            backgroundColor:COLORS.background,
            position:'relative',
            paddingBottom:20
        }}>

       {renderQuestion()}

       {renderAnswers()} 

       {renderSuivatButton()} 

       <Modal 
       animationType="slide"
       transparent={true}
       visible={ShowScoreModal}
       >
           <View style={{
               flexDirection:'row',
               justifyContent:'center',
               alignItems:'center',
               height:'100%',
               backgroundColor:'gray'
           }}>
              <View style={{
               backgroundColor:COLORS.white,
               width:'90%',
               borderRadius:20,
               padding:20,
               alignItems:'center'

           }}>
               <Text style={{fontSize:30,fontWeight:'bold'}}>{Score > (AllQuestions.length/2) ? 'Félicitation!':'Oops'}</Text>
               <Text style={{fontSize:20,color:COLORS.gray}}>Voici votre Score</Text>
               <View style={{
                   flexDirection:'row',
                   justifyContent:'flex-start',
                   alignItems:'center',
                   marginVertical:20
               }}>
                   <Text style={{
                       fontSize:30,
                       color: Score > (AllQuestions.length/2)? COLORS.success:COLORS.error
                   }}>{Score}</Text>
                   <Text style={{
                       fontSize:20,color:COLORS.black
                   }}>/ {AllQuestions.length}</Text>
               </View>
               <TouchableOpacity 
               onPress={RestartQuiz}
               style={{
                   backgroundColor:COLORS.accent,
                   padding:20,width:'100%',borderRadius:20
               }}>
                   <Text style={{
                       textAlign:'center',color:COLORS.white,fontSize:20
                   }}>Refaire le test</Text>
               </TouchableOpacity>
           </View> 
           </View>
           

       </Modal>
             

        </View>


    </SafeAreaView>
  );
};

export default Quiz;