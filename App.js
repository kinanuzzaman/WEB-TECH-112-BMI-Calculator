import {
  StyleSheet,
  View,
  Text,
  Picker,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";

export default class SwitchExample extends Component {
  state = {
    choosenIndex: 0,
    height: "",
    weight: "",
    bmi: "",
    BmiResult: "",
  };
  handleHeight = (text) => {
    this.setState({ height: text });
  };
  handleWeight = (text) => {
    this.setState({ weight: text });
  };

  calculate = (height, weight) => {
    if (this.state.choosenIndex == 0) {
      //calculation si
      var result =
        (parseFloat(weight) * 10000) /
        (parseFloat(height) * parseFloat(height));
    } else if (this.state.choosenIndex == 1) {
      //calculation imperial
      result =
        (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
    }
    result = result.toFixed(2);
    //display result
    this.setState({ bmi: result });
    if (result < 18.5) {
      this.setState({ BmiResult: "Underweight" });
    } else if (result >= 18.5 && result < 25) {
      this.setState({ BmiResult: "Normal weight" });
    } else if (result >= 25 && result < 30) {
      this.setState({ BmiResult: "Overweight" });
    } else if (result >= 30) {
      this.setState({ BmiResult: "Obese" });
    } else {
      alert("Incorrect Input!");
      this.setState({ BmiResult: "" });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>
        <Text style={styles.textStyle}>Select measurement system</Text>
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemPosition) =>
            this.setState({ language: itemValue, choosenIndex: itemPosition })
          }
        >
          <Picker.Item label="SI(kg/cm)" value="si" />
          <Picker.Item label="Imperial(lb/in)" value="im" />
        </Picker>

        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          //placeholder = "Weight (Kg)"
          autoCapitalize="none"
          onChangeText={this.handleWeight}
        />

        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          //placeholder = "Height (Cm)"
          autoCapitalize="none"
          onChangeText={this.handleHeight}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.calculate(this.state.height, this.state.weight)}
        >
          <Text style={styles.submitButtonText}> Calculate </Text>
        </TouchableOpacity>
        <Text style={styles.output}>{this.state.bmi}</Text>
        <Text style={styles.resultText}>{this.state.BmiResult}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  pickerStyle: {
    height: 50,
    width: "80%",
    color: "#344953",
    justifyContent: "center",
  },
  input: {
    margin: 15,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#000080",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    // fontWeight:"bold",
    fontSize: 18,
  },
  output: {
    textAlign: "center",
    fontSize: 30,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  resultText: {
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 30,
    color: "blue",
  },
  label: {
    marginLeft: 15,
  },
});
