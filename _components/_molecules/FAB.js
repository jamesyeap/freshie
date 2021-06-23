import { propNames } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FAB as ParentFAB, Portal, Provider } from 'react-native-paper';

export const FAB = (props) => {
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
              icon: 'plus',
              label: 'Add Custom Meal',
              onPress: () => props.gotoAddCustomMeal(),
              small: false,
            },
            {
              icon: 'silverware-fork-knife',
              label: 'Restaurants',
              onPress: () => console.log("Hello"),
              small: false,
            },
            {
              icon: 'food',
              label: 'Your Meals',
              onPress: () => props.gotoMeals(),
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


      