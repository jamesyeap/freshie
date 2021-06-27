import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import { SemiBoldText } from '../../_atoms/Text';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	const { loading, error } = state.auth;
	return { loading, error };
}

export function LoginSnackBar (props) {
  const [visible, setVisible] = React.useState(true);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
      <Snackbar
        visible={props.visible}
	duration={100000}
        onDismiss={onDismissSnackBar}
	wrapperStyle={{
		marginBottom: 30,
		alignItems: "center",
		width: "100%",
	}}
	style={{
		flexDirection: 'row',
		alignItems: 'center',
		width: "90%",
		
		justifyContent: "space-between",
		borderColor: "black",
	}}
	>
	Logging you in
      </Snackbar>
  );
};

export default connect(mapStateToProps)(LoginSnackBar);

/*
return (
	<Snackbar
	  visible={visible}
	  duration={100000}
	  onDismiss={onDismissSnackBar}
	  action={{
	    label: 'Undo',
	    onPress: () => {
	      // Do something
	    },
	  }}
	  wrapperStyle={{
		  marginBottom: 30,
		  alignItems: "center"
	  }}
	  style={{
		  width: "90%",
		  backgroundColor: "red"
	  }}
	  >
	  Hey there! I'm a Snackbar.
	</Snackbar>
    );
  };
  */