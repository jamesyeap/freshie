import React, { useState } from 'react';
import { FAB as ParentFAB, Portal, Provider } from 'react-native-paper';

export const FAB = () => {
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  
  const fabStyle = {
	  backgroundColor: "#F6C243"
  }

  return (
    <Provider>
      <Portal>
        <ParentFAB.Group
	  fabStyle={fabStyle}
          open={open}
          icon={open ? 'minus' : 'plus'}
          actions={[
            {
              icon: 'silverware-fork-knife',
              label: 'Restaurants',
              onPress: () => console.log('Pressed restaurants'),
	      small: false,
            },
            {
              icon: 'plus',
              label: 'Add a meal',
              onPress: () => console.log('Pressed add meal'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};


      