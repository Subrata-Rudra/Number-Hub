// This converts Any Base Number(base <= 10) to Decimal Number
function anyBaseToDecimal(num, base) {
  let ans = 0,
    power = 1;
  while (num != 0) {
    let rem = parseInt(num % 10);
    ans = ans + rem * power;
    num = parseInt(num / 10);
    power = power * base;
  }
  return ans;
}

// This converts Decimal Number to Any Base Number(base <= 10)
function decimalToAnyBase(num, base) {
  let ans = 0,
    power = 1;
  while (num != 0) {
    let rem = parseInt(num % base);
    ans = ans + rem * power;
    num = parseInt(num / base);
    power = power * 10;
  }
  return ans;
}

// This converts Decimal Number to Hexadecimal Number
function decimalToHexadecimal(num) {
  let i = 0;
  let arr = [];
  while (num != 0) {
    let rem = parseInt(num % 16);
    num = parseInt(num / 16);
    if (rem < 10) {
      arr[i] = String.fromCharCode(48 + rem);
      i++;
    } else {
      arr[i] = String.fromCharCode(55 + rem);
      i++;
    }
  }
  let ans_str = "";
  for (let j = i - 1; j >= 0; j--) {
    ans_str += arr[j];
  }
  return ans_str;
}

// This converts Hexadecimal Number to Decimal Number
function hexadecimalToDecimal(num) {
  // Convert a number to a hexadecimal string with:
  let num1 = num.toString(16);

  // And reverse the process with:
  let ans = parseInt(num1, 16);
  return ans;
}

// This converts Any Base Number to Any Base Number(base <= 10)
function anyBaseToAnyBase(num, base_from, base_to) {
  let decimal = anyBaseToDecimal(num, base_from);
  let final_answer = decimalToAnyBase(decimal, base_to);
  return final_answer;
}

// This converts Any Base Number(base <= 10) to Hexadecimal Number
function anyBaseToHexadecimal(num, base_from) {
  let decimal = anyBaseToDecimal(num, base_from);
  let final_answer = decimalToHexadecimal(decimal);
  return final_answer;
}

// This converts Hexadecimal Number to Any Base Number(base <= 10)
function hexadecimalToAnyBase(num, base_to) {
  let decimal = hexadecimalToDecimal(num);
  let final_answer = decimalToAnyBase(decimal, base_to);
  return final_answer;
}

//DOM Manipulation
const btn = document.getElementById("btn");
const refresh = document.getElementById("refresh");
//*******************
const calculate = document.getElementById("calculate");
const refresh1 = document.getElementById("refresh1");
calculate.onclick = function () {
  let base, operation;
  let inp1 = document.getElementById("input_data1").value;
  let inp2 = document.getElementById("input_data2").value;
  base = document.getElementById("op_base_select").value;
  operation = document.getElementById("opeartion_select").value;

  //Output Processing
  let decimal1, decimal2, ans, final_ans;
  if (base <= 10) {
    decimal1 = anyBaseToDecimal(inp1, base);
    decimal2 = anyBaseToDecimal(inp2, base);
  } else if (base == 16) {
    decimal1 = hexadecimalToDecimal(inp1, base);
    decimal2 = hexadecimalToDecimal(inp2, base);
  }
  if (operation == "+") {
    ans = decimal1 + decimal2;
  } else if (operation == "-") {
    ans = decimal1 - decimal2;
  } else if (operation == "*") {
    ans = decimal1 * decimal2;
  } else if (operation == "/") {
    ans = decimal1 / decimal2;
  }
  if (base <= 10) {
    final_ans = decimalToAnyBase(ans, base);
  } else if (base == 16) {
    final_ans = decimalToHexadecimal(ans);
  }
  document.getElementById("output1").innerHTML = final_ans;
};
refresh1.onclick = function () {
  location.reload();
};
//*******************
btn.onclick = function () {
  let base1, base2;
  let inp = document.getElementById("input_data").value;
  base1 = document.getElementById("from_select").value;
  base2 = document.getElementById("to_select").value;

  //Output Processing
  if (base1 >= 2 && base1 <= 10 && base2 >= 2 && base2 <= 10) {
    document.getElementById("output").innerHTML = anyBaseToAnyBase(
      inp,
      base1,
      base2
    );
  } else if (base1 == 16 && base2 == 16) {
    document.getElementById("output").innerHTML = inp;
  } else if (base1 == 16) {
    document.getElementById("output").innerHTML = hexadecimalToAnyBase(
      inp,
      base2
    );
  } else if (base2 == 16) {
    document.getElementById("output").innerHTML = anyBaseToHexadecimal(
      inp,
      base1
    );
  }
};
refresh.onclick = function () {
  location.reload();
};
