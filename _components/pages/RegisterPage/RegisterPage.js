
import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import styled from 'styled-components'
import {View, Button, Wizard, Text, RadioGroup, RadioButton, TextField, Toast, Dialog} from 'react-native-ui-lib';
import { BigButton, TextButton } from '../../_atoms/Button';
import { Container } from '../../_atoms/Container';
import { HeaderMediumText, MediumText, SubHeaderText } from '../../_atoms/Text';
import { Header } from '../../_molecules/Header';
import { InputLabelText, TextInput } from '../../_molecules/TextInput';
import { startDetecting } from 'react-native/Libraries/Utilities/PixelRatio';

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
      userName: undefined,
      firstName: undefined,
      lastName: undefined,
      emailAddress: undefined,
      password: undefined,
      passwordConfirmed: undefined,
      hasPersonalTrainer: undefined,
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

  reset = () => {
    const {customerName, selectedFlavor} = this.state;

    this.setState({
      activeIndex: 0,
      completedStepIndex: undefined,
      selectedFlavor: initialFlavor,
      customerName: undefined,
      toastMessage: `${customerName}, you bought some ${selectedFlavor.toLowerCase()}`
    },
    this.closeToast);
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
    const reset = prevActiveIndex === 2;
    if (reset) {
      this.reset();
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

  renderNextButton = disabled => {
    const {activeIndex} = this.state;
    const label = activeIndex === 2 ? 'done & reset' : 'Next';
    return (
        <View>  
            <BigButton
            testID={'uilib.nextAndResetButton'}
            label={label}
            onPress={this.goToNextStep}
            disabled={disabled}
            />
        </View>  
    );
  };

  renderCustomerDetails = () => {
    const {userName} = this.state
    const {firstName} = this.state
    const {lastName} = this.state
    const {emailAddress} = this.state
    const {password} = this.state
    const {passwordConfirmed} = this.state
    
    return (
        <Container>
            <View style= {{paddingRight: 220, marginVertical:20}}>
                <HeaderMediumText>Registration</HeaderMediumText>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
            <TextInput stacked= {0} label="Username" placeholder={"Username"} onChangeText= {this.onUserNameEntered} value={userName} />
            <TextInput stacked= {0} label="First Name" placeholder={"First Name"} onChangeText= {this.onFirstNameEntered} value={firstName}/>
            <TextInput stacked= {0} label="Last Name" placeholder={"Last Name"} onChangeText= {this.onLastNameEntered} value={lastName}/>
            <TextInput stacked= {0} label="Email Address" placeholder={"example@abc.com"} onChangeText= {this.onEmailEntered} value={emailAddress}/>
            <TextInput stacked= {0} label="Password" placeholder={"Enter at least 8 characters"} onChangeText= {this.onPasswordEntered} value={password}/>
            <TextInput stacked= {0} label="Re-password" placeholder={"Confirm your password"} onChangeText={this.onPasswordConfirm} value={passwordConfirmed}/>
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {this.renderNextButton()}
            </View>
        </Container>
    );
  };

  onUserNameEntered = userName => {
    this.setState({userName});
  };

  onFirstNameEntered = firstName => {
    this.setState({firstName});
  };

  onLastNameEntered = lastName => {
    this.setState({lastName});
  };

  onEmailEntered = emailAddress => {
    this.setState({emailAddress});
  };
  
  onPasswordEntered = password => {
    this.setState({password})
  }

  onPasswordConfirm = passwordConfirmed => {
    this.setState({passwordConfirmed}) 
  }


  renderCustomerDetails2 = () => {
    const {customerName, hasPersonalTrainer} = this.state;
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
  };

  onHasPersonalTrainer = (hasPersonalTrainer) => {
    console.log(this.state.hasPersonalTrainer)
    this.setState({hasPersonalTrainer: true})
    console.log(this.state.hasPersonalTrainer)
  }

  renderQuestions = () => {
    return (
      <Container>
        <View style= {{marginRight: 35, marginVertical:20}}>
          <HeaderMediumText>Just a few more questions...</HeaderMediumText> 
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TextInput stacked= {0} label="Question 1" placeholder={"Answer here"}/>
          <TextInput stacked= {0} label="Question 1" placeholder={"Answer here"}/>
          <TextInput stacked= {0} label="Question 1" placeholder={"Answer here"}/>
          <TextInput stacked= {0} label="Question 1" placeholder={"Answer here"}/>
        </ScrollView> 
        <View marginB-72>
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

  render() {
    const {activeIndex, allTypesIndex, toastMessage} = this.state;

    return (
        <View useSafeArea flex>
            
            <View style={styles.container}>
                <Wizard testID={'uilib.wizard'} activeIndex={activeIndex} onActiveIndexChanged={this.onActiveIndexChanged}>
                <Wizard.Step state={this.getStepState(0)} label={'Account details'}/>
                <Wizard.Step state={this.getStepState(1)} label={'Account details'}/>
                <Wizard.Step state={this.getStepState(2)} label={'Quick Questions'}/>
                </Wizard>
                
                {this.renderCurrentStep()}
            </View>
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
