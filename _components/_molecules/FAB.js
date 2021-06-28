import React, { useState } from 'react';
import { FAB as ParentFAB, Portal, Provider } from 'react-native-paper';

export const FAB = (props) => {
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  
  const fabStyle = {
	  backgroundColor: "#AFEEEE",
  }

  const buttonChoices = () => {
    if (props.variation === "trainer") {
      return (
        <ParentFAB.Group
	        fabStyle={fabStyle}
          open={open}
          icon={open ? 'minus' : 'plus'}
          actions={[
            {
              icon: 'food-drumstick',
              label: 'Add Meal',
              onPress: () => props.gotoAddMeal(),
              small: false,
            },
            {
              icon: 'book',
              label: 'Add Meal Plan',
              onPress: () => props.gotoAddMealPlan(),
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
      )
    } else {
      return (
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
              icon: 'book',
              label: 'Add Meal Plan',
              onPress: () => props.gotoAddMealPlan(),
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
      )
    }
  }

  return (
    <Provider>
      <Portal>
        {buttonChoices()}
      </Portal>
    </Provider>
  );
};


      