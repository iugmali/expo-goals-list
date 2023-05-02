import {Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import {StatusBar} from "expo-status-bar";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])

  const onAddGoal = (enteredGoalText) => {
    setCourseGoals((prevState) => [...prevState, enteredGoalText])
    endAddGoalHandler()
  }

  const onDeleteGoal = (i) => {
    setCourseGoals(prevState => prevState.filter((item, index) => index !== i))
  }

  const startAddGoalHandler = () => {
    setModalIsVisible(true)
  }
  const endAddGoalHandler = () => {
    setModalIsVisible(false)
  }

  return (
    <>
      <StatusBar style={"light"} />

      <View style={styles.appContainer}>
        <Button title={"Add New Goal"} color={"#9968dc"} onPress={startAddGoalHandler}/>
        <GoalInput showModal={modalIsVisible} onAddGoal={onAddGoal} onCancel={endAddGoalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            renderItem={itemData => {
              return (
                <GoalItem index={itemData.index} text={itemData.item} onDeleteGoal={onDeleteGoal} />
              )
            }}
            keyExtractor={(item, index) => {
              return index.toString()
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 4
  }
});
