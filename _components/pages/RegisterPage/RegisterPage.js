
import _ from 'lodash';
import React, {Component, useEffect} from 'react';
import {StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components'
import {View, Button, Wizard, Text, RadioGroup, RadioButton, TextField, Toast, Dialog, Image, ComponentsColors} from 'react-native-ui-lib';
import { BigButton, TextButton } from '../../_atoms/Button';
import { Container } from '../../_atoms/Container';
import { HeaderMediumText, MediumText, SubHeaderText } from '../../_atoms/Text';
import { Header } from '../../_molecules/Header';
import { InputLabelText, TextInput } from '../../_molecules/TextInput';
import { startDetecting } from 'react-native/Libraries/Utilities/PixelRatio';
import { border, Center, useFocusEffect } from '@chakra-ui/react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { column } from 'stylis';
import * as ImagePicker from 'expo-image-picker';
import { signupAsync } from '../../../_utilities/_api/Auth';


const stepTypes = _.map(Wizard.States, state => {
  return <Text key={state}>{state}</Text>;
});

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      completedStepIndex: undefined,
      allTypesIndex: 0,
      username: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password1: undefined,
      password2: undefined,
      hasPersonalTrainer: undefined,
      personalTrainerCert: undefined,
      personalTrainerRef: undefined,
      toastMessage: undefined
    };
  }

  onActiveIndexChanged = activeIndex => {
    this.setState({activeIndex});
  };

  onAllTypesIndexChanged = allTypesIndex => {
    this.setState({allTypesIndex});
  };

  closeToast = () => {
    setTimeout(() => {
      this.setState({toastMessage: undefined});
    }, 2000);
  };


  goToPrevStep = () => {
    const {activeIndex: prevActiveIndex} = this.state;
    const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

    this.setState({activeIndex});
  };

  renderPrevButton = () => {
    return (
      <TextButton onPress={this.goToPrevStep} testID={'uilib.prevButton'} label="back to previous"/>
    );
  };

  setToastMessage = (message) => {
    this.setState({toastMessage})
  }

  goToNextStep = () => {
    /*
    const requiredList = 
      [this.state.userName, this.state.firstName, this.state.lastName, this.state.emailAddress, this.password, this.passwordConfirmed]
    if (this.state.activeIndex === 0) {
      if (requiredList.every((x) => x === undefined)) {
        // this.setToastMessage("You have left some fields empty!")
        alert("You have left some fields empty!")
        return;
      }
      if (this.state.password !== this.state.passwordConfirmed) {
        alert("Your passwords do not match!")
        return;
      } 
    }
    */

    const {activeIndex: prevActiveIndex, completedStepIndex: prevCompletedStepIndex} = this.state;
    const createAccount = prevActiveIndex === 2;
    if (createAccount) {
      this.createAccount;
      return;
    }

    const activeIndex = prevActiveIndex + 1;
    let completedStepIndex = prevCompletedStepIndex;
    if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
      completedStepIndex = prevActiveIndex;
    }

    if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
      this.setState({activeIndex, completedStepIndex});
    }
  };

  createAccount = () => {
    this.props.navigation.push("Trainer")
    signupAsync(this.state);
  }

  renderNextButton = disabled => {
    const {activeIndex} = this.state;
    const label = activeIndex === 2 ? 'Create Account' : 'Next';
    return (
        <View>  
            <BigButton
            testID={'uilib.nextAndResetButton'}
            label={label}
            onPress={activeIndex === 2 ? this.createAccount : this.goToNextStep}
            disabled={disabled}
            />
        </View>  
    );
  };

  renderCustomerDetails = () => {
    const {username} = this.state
    const {firstName} = this.state
    const {lastName} = this.state
    const {email} = this.state
    const {password1} = this.state
    const {password2} = this.state
    
    return (
      <Container>
          <View style= {{paddingRight: 220, marginVertical:20}}>
              <HeaderMediumText>Registration</HeaderMediumText>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView, {height: 700}}>
            <TextInput stacked={0} label="Username" placeholder={"Username"} onChangeText= {this.onUserNameEntered} value={username} />
            <TextInput stacked={0} label="First Name" placeholder={"First Name"} onChangeText= {this.onFirstNameEntered} value={firstName}/>
            <TextInput stacked={0} label="Last Name" placeholder={"Last Name"} onChangeText= {this.onLastNameEntered} value={lastName}/>
            <TextInput stacked={0} label="Email Address" placeholder={"example@abc.com"} onChangeText= {this.onEmailEntered} value={email}/>
            <TextInput stacked={0} label="Password" placeholder={"Enter at least 8 characters"} onChangeText= {this.onPassword1} value={password1}/>
            <TextInput stacked={0} label="Re-password" placeholder={"Confirm your password"} onChangeText={this.onPassword2} value={password2}/>
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {this.renderNextButton()}
          </View>
      </Container>
    );
  };

  onUserNameEntered = username => {
    this.setState({username});
  };

  onFirstNameEntered = firstName => {
    this.setState({firstName});
  };

  onLastNameEntered = lastName => {
    this.setState({lastName});
  };

  onEmailEntered = email => {
    this.setState({email});
  };
  
  onPassword1 = password1 => {
    this.setState({password1})
  }

  onPassword2 = password2 => {
    this.setState({password2}) 
  }

  onImageUpload = personalTrainerCert => {
    console.log("changed state")
    this.setState({personalTrainerCert})
    setTimeout(() => {return}, 1000);
  }

  onImagePicker = async () => {
    const {personalTrainerCert} = this.state
    let perms = await ImagePicker.getMediaLibraryPermissionsAsync()
    if (perms.accessPrivileges === "none") {
      perms = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (perms.accessPrivileges === "none") {
        alert("Please go to settings and allow freshie to access your photos!")
      }
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.onImageUpload(result.uri);
      }
    }
  }
  

  renderCustomerDetails2 = () => {
    const {customerName, hasPersonalTrainer, personalTrainerCert} = this.state;
    const iconPlaceholder = () => <Ionicons name="cloud-upload-outline" size={24}></Ionicons>
    const imageUploaded = () => {
      return (
        <Image resizeMode="contain" style= {{width:"100%", height: "100%"}} source= {{uri: personalTrainerCert}} defaultSource={require("../../../assets/no-image-placeholder.jpeg")}></Image>
      )
    }
    const imagePlaceholder = personalTrainerCert === undefined ? iconPlaceholder() : imageUploaded()
    if (this.props.route.params.isPersonalTrainer) {
      return (
        <Container>
          <View style= {{flex: 0.15, marginVertical:20}}>
            <HeaderMediumText>Upload your certification to be verified!</HeaderMediumText>
          </View> 
          <TouchableOpacity onPress={() => this.onImagePicker()} style={{flex: 0.35, flexDirection: 'row', justifyContent:'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: "#505050", width: "50%", height: "100%"}}>
            {imagePlaceholder}
          </TouchableOpacity>
          <View style={{flex: 0.8, justifyContent: 'flex-end'}}>
              <View>
                {this.renderNextButton(_.isNil(customerName) || customerName.trim().length === 0)}
              </View>
              <View marginT-10>
                {this.renderPrevButton()}
              </View>  
            </View>
        </Container>
      )
    } else {
      return (
          <Container>
            <View style= {{paddingRight: 220, marginVertical:20}}>
                  <HeaderMediumText>Registration</HeaderMediumText>
            </View>
            <InputLabelText style={{marginLeft: 8}}>Were you introduced by a personal trainer?</InputLabelText>
            <RadioGroup marginR-250 onValueChange={this.onHasPersonalTrainer}>
              <RadioButton label="Yep" value= {true} style= {{marginVertical: 5}} color="#319795"/>
              <RadioButton label="Nope" value= {false} style= {{marginVertical: 5}} color="#319795"/>
            </RadioGroup>
            <TextInput label="Referral Code" placeholder={"Your personal trainer's referral code"}/>
            <View style={{marginTop: 360}}>
              <View>
                {this.renderNextButton(_.isNil(customerName) || customerName.trim().length === 0)}
              </View>
              <View marginT-10>
                {this.renderPrevButton()}
              </View>  
            </View>
          </Container>
        );
    }
  };

  onHasPersonalTrainer = (hasPersonalTrainer) => {
    console.log(this.state.hasPersonalTrainer)
    this.setState({hasPersonalTrainer: true})
    console.log(this.state.hasPersonalTrainer)
  }

  renderQuestions = () => {
    const clientQuestions = () => {
      return (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TextInput stacked= {0} label="c Question 1" placeholder={"Answer here"}/>
          <TextInput stacked= {0} label="c Question 1" placeholder={"Answer here"}/>
          <TextInput stacked= {0} label="c Question 1" placeholder={"Answer here"}/>
          <TextInput stacked= {0} label="c Question 1" placeholder={"Answer here"}/>
        </ScrollView> 
      )
    }
    const personalTrainerQuestions = () => {
      return (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TextInput stacked= {0} label="p Question 1" placeholder={"Answer here"}/>
          <TextInput stacked= {0} label="p Question 1" placeholder={"Answer here"}/>
          <TextInput stacked= {0} label="p Question 1" placeholder={"Answer here"}/>
          <TextInput stacked= {0} label="p Question 1" placeholder={"Answer here"}/>
        </ScrollView> 
      ) 
    }
    const questionType = this.props.route.params.isPersonalTrainer ? personalTrainerQuestions : clientQuestions
    return (
      <Container>
        <View style= {{marginRight: 35, marginVertical:20}}>
          <HeaderMediumText>Just a few more questions...</HeaderMediumText> 
        </View>
          {questionType()}
        <View >
          <View>
            {this.renderNextButton()}
          </View>
          <View marginT-10>
            {this.renderPrevButton()}
          </View>
        </View>
      </Container>
    );
  };

  renderCurrentStep = () => {
    const {activeIndex} = this.state;

    switch (activeIndex) {
      case 0:
      default:
        return this.renderCustomerDetails();
      case 1:
        return this.renderCustomerDetails2();
      case 2:
        return this.renderQuestions();
    }
  };

  getStepState(index) {
    const {activeIndex, completedStepIndex} = this.state;
    let state = Wizard.States.DISABLED;
    if (completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED;
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED;
    }

    return state;
  }

  registerRoute = (activeIndex, allTypesIndex, toastMessage) => {
    return (
      <View useSafeArea flex backgroundColor="white">
            <StatusBar style="dark"></StatusBar>
            <View style={styles.container}>
              <Wizard testID={'uilib.wizard'} activeIndex={activeIndex} onActiveIndexChanged={this.onActiveIndexChanged}>
              <Wizard.Step state={this.getStepState(0)} label={'Account details'}/>
              <Wizard.Step state={this.getStepState(1)} label={'Account details'}/>
              <Wizard.Step state={this.getStepState(2)} label={'Quick Questions'}/>
              </Wizard>
              {this.renderCurrentStep()}
            </View>
        </View>
    )
  }

  clientRegister = (activeIndex, allTypesIndex, toastMessage) => {
    return (
      <View useSafeArea flex backgroundColor="white">
            <StatusBar style="dark"></StatusBar>
            <View style={styles.container}>
              <Wizard testID={'uilib.wizard'} activeIndex={activeIndex} onActiveIndexChanged={this.onActiveIndexChanged}>
              <Wizard.Step state={this.getStepState(0)} label={'Account details'}/>
              <Wizard.Step state={this.getStepState(1)} label={'Account details'}/>
              <Wizard.Step state={this.getStepState(2)} label={'Quick Questions'}/>
              </Wizard>
              {this.renderCurrentStep()}
            </View>
        </View>
    )
  }

  personalTrainerRegister = () => {
    <SafeAreaView>
      <BigButton></BigButton>
    </SafeAreaView>
  }

  render() {
    const {activeIndex, allTypesIndex, toastMessage} = this.state;
    return (
      <View style= {{flex: 1}}>
        {this.registerRoute(activeIndex, allTypesIndex, toastMessage)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 0.78
  },
  container: {
    flex: 1
  },
  allTypes: {
    justifyContent: 'space-between'
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 20
  }
});
