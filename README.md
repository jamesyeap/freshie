# Freshie
A project made for NUS Orbital 2021

## Level of Achievement
Apollo 11

## Project Scope
Freshie is a mobile-application that helps personal trainers design nutrition programs for their clients.

The application caters to three main groups of users: 
  - [Personal trainers](#personal-trainer)
  - [Clients](#clients)
  - [Users without a personal trainer](#regular-users)


<details><summary>Personal Trainer</summary>
##### Signing up
After a personal trainer creates an account, he will be assigned a code that he can give to his clients to sign up with the application.

##### Home
Upon signing in, three main sections will be shown:
  - [Clients](#list-of-clients)
  - [Meal Plans](#list-of-meal-plans)
  - [Food Items](#list-of-food-items)

###### Clients
In this section, a personal trainer can access the relevant information for his clients, including:
  - Meal plans assigned to the client
  - Physical measurements (height, weight, etc)
  - Target calories for the client

###### Meal Plans
In this section, a personal trainer can create a meal plan, assign it to a specific client, and make the necessary changes to it as needed.

A meal plan contains the following:
  - The total calories for the food items contained in it
  - The food items

To add variety to his client's nutrition plan and ensure better adherence, the application allows personal trainers to create multiple meal plans for the same client.

###### Food Items
In this section, a personal trainer can create a food item. In addition to specifying how many calories it provides, he can also provide his client with information on:
  - the ingredients needed to prepare it
  - the steps to follow to prepare it
</details>


### Clients
---
During sign-up, a client can provide his personal trainer's referral code to associate their accounts.

After signing in, a client will be sent to the Home page, with 3 main components:
  - A pie-chart showing how many calories were consumed (and how many are left)
  - A section with a history of food items consumed for the day (and the past)
  - A bar-chart showing the total-calories consumed for each day of the current week

At meal times, a client can decide what to eat by navigating to three main sections:
  - [Meal Plans](#meal-plans)
  - [Custom Food Items](#custom-food-items)
  - [Favorites](#favorites)

#### Meal Plans
In this section, a client can view the customized meal plans made for him by his personal-trainer. 

Information on how to and what is needed to prepare the food items can also be accessed here.

#### Custom Food Items
Although it is an ideal outcome, it would be unrealistic to expect a client to follow the prescribed meal-plan all the time. 

Hence, the application also allows clients to create their own food items.

#### Favorites
This section holds the food items that a client has marked as a personal favorite.



### Regular Users
---
By and large, users without a personal trainer will be able to use the application much like a client of a personal trainer would, with the exception that they have to create their own meal plans instead.





## Core Features Developed
  - Calculate target calories based on physical measurements [see how](#calculating-target-calories)
  - Calorie tracking features
      - Pie-chart that indicates how many calories were consumed for the day (and how many are left)
      - List of food items consumed for the day (and in the past)
      - Bar-chart of calories consumed for the past few days
  - Create meal plans
      - Personal trainers can assign specific meal plans to their clients
      - Users without personal trainers can create meal plans for their own use
  - Create food items
     - In addition to providing the calories for a food item, personal trainers can also specify:
         - the ingredients needed to prepare the food item
         - the instructions for preparation
  - Consume food items

## Problems Encountered


## Appendix

#### Calculating target calories
``` Javascript

/* STEP 1: Calculate the user's basal metabolic rate.

  Inputs
    - Weight [in kg]
    - Height [in cm]
    - Age [in years]
    - Gender [male, female]
  
  Output
    - Basal metabolic rate (BMR) [in kcal]
*/

const maleBMR = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age)) + 5;
const femaleBMR = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age)) - 161;

/* STEP 2: Apply a multiplier to the basal metabolic rate based on the user's activity level.

  Inputs
    - Basal metabolic rate (BMR) [in kcal]
    
    - Activity Level
      - Sedentary (little or no exercise)
      - Lightly active (sports 1-3 days/week)
      - Moderately active (sports 3-5 days/week)
      - Very active (sports 6-7 days a week)
      - If you are extra active (sports / working in a physical job)
  
  Output
    - Target calories [in kcal]
*/

const multipliers = [1.2, 1.375, 1.55, 1.725, 1.9];
const targetCalories = multipliers[activityLevel] * bmr;

```
