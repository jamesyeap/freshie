
import _ from 'lodash';
import React, { useState } from 'react';
import {StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import {View, Wizard, Text, RadioGroup, RadioButton, Image } from 'react-native-ui-lib';
import { SmallButton, BigButton, TextButton } from '../../_atoms/Button';
import { Container } from '../../_atoms/Container';
import { HeaderMediumText } from '../../_atoms/Text';
import { InputLabelText, TextInput } from '../../_molecules/TextInput';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { connect, useDispatch } from 'react-redux';
import { signupAsync_API, acknowledge } from '../../../_redux/actions/Auth.actions';
import calculateCalories from '../../../_utilities/_helperFunctions/calculateCalories';
import { DateTimePicker } from '../../_molecules/DateTimePicker';
import { ButtonGroup } from '../../_molecules/ButtonGroup';
import { Snackbar } from 'react-native-paper';

function mapStateToProps(state) {
  const { loading, error } = state.auth;
  return { loading, error };
}

export function RegisterPage(props) {
  const [weight, setWeight] = useState(undefined);
  const [height, setHeight] = useState(undefined);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(1598051730000));
  const [gender, setGender] = useState(undefined);
  const [activityLevel, setActivityLevel] = useState(undefined);
  const [hasPersonalTrainer, setHasPersonalTrainer] = useState(undefined);
  const [referralCode, setReferralCode] = useState("none");
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [password1, setPassword1] = useState(undefined);
  const [password2, setPassword2] = useState(undefined);
  const [activeIndex, setActiveIndex]= useState(0);
  const [completedStepIndex, setCompletedStepIndex] = useState(undefined);
  const [allTypesIndex, setAllTypesIndex] = useState(0);
  const [personalTrainerCert, setPersonalTrainerCert] = useState(undefined);
  const [toastMessage, setToastMessage] = useState(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();

  const onActiveIndexChanged = newActiveIndex => {
    setActiveIndex(newActiveIndex)
  };

  const onAllTypesIndexChanged = newAllTypesIndex => {
    setAllTypesIndex(newAllTypesIndex)
  };

  const goToPrevStep = () => {
    const prevActiveIndex = activeIndex;
    const newIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

    setActiveIndex(newIndex);
  };

  const renderPrevButton = () => {
    return (
      <TextButton onPress={goToPrevStep} testID={'uilib.prevButton'} label="back to previous"/>
    );
  };

  const goToNextStep = () => {
    const requiredList = [username, firstName, lastName, email, password1, password2]

    if (activeIndex === 0) {
      if (requiredList.every((x) => x === undefined)) {
        alert("You have left some fields empty!")
      }

      if (password1 !== password2) {
        alert("Your passwords do not match!")
      } 
    }

    const createAccount = activeIndex === 2;
    if (createAccount) {
      createAccount();
    }

    const newActiveIndex = activeIndex + 1;
    let newCompletedStepIndex = completedStepIndex;

    if (!completedStepIndex || completedStepIndex < activeIndex) {
      newCompletedStepIndex = activeIndex;
    }

    if (newActiveIndex !== activeIndex || newCompletedStepIndex !== completedStepIndex) {
      setActiveIndex(newActiveIndex)
      setCompletedStepIndex(newCompletedStepIndex)
    }
  };

  /* Creates an account for the client */
  const createAccount = () => {
    /* Calculate the age of the client from the birth date*/
    const monthDiff = Date.now() - dateOfBirth.getTime();
    const ageDT = new Date(monthDiff);
    const year = ageDT.getUTCFullYear();
    const age = Math.abs(year - 1970);

    /* Calculate the maximum calories the client needs to eat to hit goal */
    const calories = Math.round(calculateCalories(weight, height, age, gender, activityLevel));
    
    if (!props.route.params.isPersonalTrainer) {
      dispatch(signupAsync_API({
        username, 
        email,
        firstName,
        lastName,
        password1,
        password2,
        isPersonalTrainer: false, 
        calories, 
        referralCode 
      }))
    } else {
      dispatch(signupAsync_API({ 
        username, 
        email,
        firstName,
        lastName,
        password1,
        password2,
        isPersonalTrainer: true, 
      }))
    }
  }

  const renderNextButton = disabled => {
    const label = activeIndex === 2 ? 'Create Account' : 'Next';

    return (
        <View>  
            <BigButton
            testID={'uilib.nextAndResetButton'}
            label={label}
            onPress={activeIndex === 2 ? createAccount : goToNextStep}
            disabled={disabled}
            />
        </View>  
    );
  };

  const renderCustomerDetails = () => {
    return (
      <Container>
          <View style= {{paddingRight: 220, marginVertical:20}}>
              <HeaderMediumText>Registration</HeaderMediumText>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView, {height: 700}}>
            <TextInput stacked={0} label="Username" placeholder={"Username"} onChangeText={setUsername} value={username} />
            <TextInput stacked={0} label="First Name" placeholder={"First Name"} onChangeText={setFirstName} value={firstName}/>
            <TextInput stacked={0} label="Last Name" placeholder={"Last Name"} onChangeText={setLastName} value={lastName}/>
            <TextInput stacked={0} label="Email Address" placeholder={"example@abc.com"} onChangeText={setEmail} value={email}/>
            <TextInput stacked={0} label="Password" placeholder={"Enter at least 8 characters"} onChangeText={setPassword1} value={password1} secureTextEntry />
            <TextInput stacked={0} label="Re-password" placeholder={"Confirm your password"} onChangeText={setPassword2} value={password2} secureTextEntry />
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {renderNextButton()}
          </View>
      </Container>
    );
  };

  const onImageUpload = image => {
    console.log("changed state")
    setPersonalTrainerCert(image)
    setTimeout(() => {return}, 1000);
  }

  const onImagePicker = async () => {
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
        onImageUpload(result.uri);
      }
    }
  }
  
  const renderCustomerDetails2 = () => {
    const iconPlaceholder = () => <Ionicons name="cloud-upload-outline" size={24}></Ionicons>
    const imageUploaded = () => {
      return (
        <Image resizeMode="contain" style= {{width:"100%", height: "100%"}} source= {{uri: personalTrainerCert}} defaultSource={require("../../../assets/no-image-placeholder.jpeg")}></Image>
      )
    }
    const imagePlaceholder = personalTrainerCert === undefined ? iconPlaceholder() : imageUploaded()
    if (props.route.params.isPersonalTrainer) {
      return (
        <Container>
          <View style= {{flex: 0.15, marginVertical:20}}>
            <HeaderMediumText>Upload your certification to be verified!</HeaderMediumText>
          </View> 
          <TouchableOpacity onPress={onImagePicker} style={{flex: 0.35, flexDirection: 'row', justifyContent:'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: "#505050", width: "50%", height: "100%"}}>
            {imagePlaceholder}
          </TouchableOpacity>
          <View style={{flex: 0.8, justifyContent: 'flex-end'}}>
              <View>
                {renderNextButton(_.isNil(username) || username.trim().length === 0)}
              </View>
              <View marginT-10>
                {renderPrevButton()}
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
            <RadioGroup marginR-250>
              <RadioButton label="Yep" value={true} onPress={() => setHasPersonalTrainer(true)} style= {{marginVertical: 5}} color="#319795"/>
              <RadioButton label="Nope" value={false} onPress={() => setHasPersonalTrainer(false)} style= {{marginVertical: 5}} color="#319795"/>
            </RadioGroup>

            {hasPersonalTrainer && <TextInput label="Referral Code" placeholder={"Your personal trainer's referral code"} value={referralCode} onChangeText={setReferralCode} />}

            <View style={{position: "absolute", bottom: 0}}>
              <View>
                {renderNextButton(_.isNil(username) || username.trim().length === 0)}
              </View>
              <View marginT-10>
                {renderPrevButton()}
              </View>  
            </View>
          </Container>
        );
    }
  };

  const renderQuestions = () => {
    const clientQuestions = () => {
      return (
        <ScrollView contentContainerStyle={styles.scrollView, {height: 900}}>
          <TextInput stacked= {0} label="What's your weight?" placeholder={"in kg"} value={weight} onChangeText={setWeight} />
          <TextInput stacked= {0} label="What's your height?" placeholder={"in cm"} value={height} onChangeText={setHeight} />
          <DateTimePicker stacked= {0} label="What's your age?" date={dateOfBirth} setDate={setDateOfBirth}  />

          <ButtonGroup label="What's your gender?">
            <SmallButton label="Male" buttonStyle={{ width: 70 }} onPress={() => setGender(0)} isSelected={gender === 0} />
            <SmallButton label="Female" buttonStyle={{ width: 70 }} onPress={() => setGender(1)} isSelected={gender === 1} />
          </ButtonGroup>

          <ButtonGroup label="How active are you?" vertical={true} >
              <RadioButton label="Sedentary" selected={activityLevel === 0} onPress={() => setActivityLevel(0)} style= {{marginVertical: 5}} color="#319795"/>
              <RadioButton label="Lightly Active" selected={activityLevel === 1} onPress={() => setActivityLevel(1)} style= {{marginVertical: 5}} color="#319795"/>
              <RadioButton label="Moderately Active" selected={activityLevel === 2} onPress={() => setActivityLevel(2)} style= {{marginVertical: 5}} color="#319795"/>
              <RadioButton label="Very Active" selected={activityLevel === 3} onPress={() => setActivityLevel(3)} style= {{marginVertical: 5}} color="#319795"/>
              <RadioButton label="Extremely Active" selected={activityLevel === 4} onPress={() => setActivityLevel(4)} style= {{marginVertical: 5}} color="#319795"/>
          </ButtonGroup>

        </ScrollView> 
      )
    }

    const personalTrainerQuestions = () => {
      return (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TextInput stacked={0} label="Tell us a little about yourself!" placeholder="Answer here"/>
          <TextInput stacked={0} label="Your area of specialization (if any)?" placeholder="Answer here"/>
        </ScrollView> 
      ) 
    }

    const questionType = props.route.params.isPersonalTrainer ? personalTrainerQuestions : clientQuestions

    return (
      <Container>
        <View style= {{marginRight: 35, marginVertical:20}}>
          <HeaderMediumText>Just a few more questions...</HeaderMediumText> 
        </View>
          {questionType()}
        <View >
          <View>
            {renderNextButton()}
          </View>
          <View marginT-10>
            {renderPrevButton()}
          </View>
        </View>
      </Container>
    );
  };

  const renderCurrentStep = () => {
    switch (activeIndex) {
      case 0:
      default:
        return renderCustomerDetails();
      case 1:
        return renderCustomerDetails2();
      case 2:
        return renderQuestions();
    }
  };

  const getStepState = (index) => {
    let state = Wizard.States.DISABLED;
    if (completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED;
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED;
    }

    return state;
  }

  const registerRoute = (activeIndex, allTypesIndex, toastMessage) => {
    return (
      <View useSafeArea flex backgroundColor="white">
            <StatusBar style="dark"></StatusBar>
            <View style={styles.container}>
              <Wizard testID={'uilib.wizard'} activeIndex={activeIndex} onActiveIndexChanged={onActiveIndexChanged}>
              <Wizard.Step state={getStepState(0)} label={'Account details'}/>
              <Wizard.Step state={getStepState(1)} label={'Account details'}/>
              <Wizard.Step state={getStepState(2)} label={'Quick Questions'}/>
              </Wizard>
              {renderCurrentStep()}
            </View>
        </View>
    )
  }

    return (
      <View style= {{flex: 1}}>
        {registerRoute(activeIndex, allTypesIndex, toastMessage)}

        <Snackbar style={{ backgroundColor: "#60A5FA", marginBottom: 40 }} visible={props.loading}>Loading</Snackbar>
        <Snackbar 
          style={{ backgroundColor: "#F87171", marginBottom: 40 }}
          visible={props.error}
          onDismiss={() => dispatch(acknowledge())}
          action={{
            label: 'ok',
            onPress: () => {
              dispatch(acknowledge())
            }
          }}
        >
          {props.error}
        </Snackbar>

      </View>
    );
}

export default connect(mapStateToProps)(RegisterPage);

const styles = StyleSheet.create({
  scrollView: {
    flex: 0.78,
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
