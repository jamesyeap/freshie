# Freshie
A project made for NUS Orbital 2021

## Level of Achievement
Apollo 11

## Project Scope
Freshie is a mobile-application that helps personal trainers design nutrition programs for their clients.

The application caters to three main groups of users: 
  - personal trainers
  - clients working with a personal trainer 
  - users without a personal trainer

## Core Features Developed
  - Calculate target calories based on physical measurements [see how](#calculating-target-calories)
  - Calorie tracking features [see components](./_components)
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
  - 

## Appendix

### Calculating target calories
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
