function binary_to_riscv(input, instruction) {
  if (input.length == 32) {
    //Binary String Validation
    for (let i = 0; i < 32; i++) {
      if ((input.charAt(i) != "0") & (input.charAt(i) != "1")) {
        alert("Error Not a Valid Binary String");
        return instruction;
      }
    }
    let opcode = parser(input, 25, 31);
    //alert("Opcode: " + opcode);
    let format = opcode_to_format(opcode);
    //alert("Format: " + format);
    if (format == "R") {
      let rd = parser(input, 20, 24);
      let funct3 = parser(input, 17, 19);
      let rs1 = parser(input, 12, 16);
      let rs2 = parser(input, 7, 11);
      let funct7 = parser(input, 0, 6);

      let operation = "";
      let rd_register = "";
      let rs1_register = "";
      let rs2_register = "";

      //binary to digit for registers
      let rd_digit = binary_to_digit(rd);
      let rs1_digit = binary_to_digit(rs1);
      let rs2_digit = binary_to_digit(rs2);
      //digit to register
      rd_register = digit_to_register(rd_digit);
      rs1_register = digit_to_register(rs1_digit);
      rs2_register = digit_to_register(rs2_digit);

      //find operation using funct3 and funct7
      if (opcode == "0110011") {
        if (funct7 == "0000000") {
          if (funct3 == "000") {
            operation = "add";
          } else if (funct3 == "001") {
            operation = "sll";
          } else if (funct3 == "010") {
            operation = "slt";
          } else if (funct3 == "011") {
            operation = "sltu";
          } else if (funct3 == "100") {
            operation = "xor";
          } else if (funct3 == "101") {
            operation = "srl";
          } else if (funct3 == "110") {
            operation = "or";
          } else if (funct3 == "111") {
            operation = "and";
          }
        } else if (funct7 == "0100000") {
          if (funct3 == "000") {
            operation = "sub";
          } else if (funct3 == "101") {
            operation = "sra";
          }
        }
      } else if (opcode == "0111011") {
        if (funct7 == "0000000") {
          if (funct3 == "000") {
            operation = "addw";
          } else if (funct3 == "001") {
            operation = "sllw";
          } else if (funct3 == "010") {
            operation = "srlw";
          }
        } else if (opcode == "0100000") {
          if (funct3 == "000") {
            operation = "subw";
          } else if (funct3 == "101") {
            operation = "sraw";
          }
        }
      }
      if (
        operation != "" &&
        rd_register != "" &&
        rs1_register != "" &&
        rs2_register != ""
      ) {
        instruction =
          operation +
          " " +
          rd_register +
          " " +
          rs1_register +
          " " +
          rs2_register;
        //alert("The RISC-V Instruction is: " + instruction);
        return instruction;
      } else {
        alert("Error Not a Valid RISC-V Instruction");
        return instruction;
      }
    } else if (format == "I") {
      let rd = parser(input, 20, 24);
      let funct3 = parser(input, 17, 19);
      let rs1 = parser(input, 12, 16);
      let imm = parser(input, 0, 11);


      let operation = "";
      let rd_register = "";
      let rs1_register = "";
      let imm_value = "";

      //imm to digit INSERT HERE
      imm_value = binary_to_digit(imm);

      //binary to digit for registers
      let rd_digit = binary_to_digit(rd);
      let rs1_digit = binary_to_digit(rs1);
      //digit to register
      rd_register = digit_to_register(rd_digit);
      rs1_register = digit_to_register(rs1_digit);


      //find operation using funct3
      if (opcode == "0000011") {
        if (funct3 == "000") {
          operation = "lb";
        } else if (funct3 == "001") {
          operation = "lh";
        } else if (funct3 == "010") {
          operation = "lw";
        } else if (funct3 == "011") {
          operation = "lw";
        } else if (funct3 == "100") {
          operation = "ld";
        } else if (funct3 == "101") {
          operation = "lbu";
        } else if (funct3 == "110") {
          operation = "lhu";
        }
      } else if (opcode == "0001111") {
        if (funct3 == "000") {
          operation = "fence";
        } else if (funct3 == "001") {
          operation = "fence.i";
        }
      } else if (opcode == "0010011") {
        if (funct3 == "000") {
          operation = "addi";
        } else if (funct3 == "001") {
          operation = "slli";
        } else if (funct3 == "010") {
          operation = "slti";
        } else if (funct3 == "011") {
          operation = "sltiu";
        } else if (funct3 == "100") {
          operation = "xori";
        } else if (funct3 == "101" && imm_value == "0000000") {
          operation = "srli";
        } else if (funct3 == "101" && imm_value == "0100000") {
          operation = "srai";
        } else if (funct3 == "110") {
          operation = "ori";
        } else if (funct3 == "111") {
          operation = "andi";
        }
      } else if (opcode == "0011011") {
        if (funct3 == "000") {
          operation = "addiw";
        } else if (funct3 == "001") {
          operation = "slliw";
        } else if (funct3 == "101" && imm_value == "0000000") {
          operation = "srliw";
        } else if (funct3 == "101" && imm_value == "0100000") {
          operation = "sraiw";
        }
      } else if (opcode == "1100111") {
        if (funct2 == "00") {
          operation = "jalr";
        }
      } else if (opcode == "1110011") {
        if (funct3 == "000" && imm_value == "000000000000") {
          operation = "ecall";
        } else if (funct3 == "000" && imm_value == "000000000001") {
          operation = "ebreak";
        } else if (funct3 == "001") {
          operation = "CSRRW";
        } else if (funct3 == "010") {
          operation = "CSRRS";
        } else if (funct3 == "011") {
          operation = "CSRRC";
        } else if (funct3 == "101") {
          operation = "CSRRWI";
        } else if (funct3 == "110") {
          operation = "CSRRSI";
        } else if (funct3 == "111") {
          operation = "CSRRCI";
        }
      }
      //Putting it all together
      if (
        operation != "" &&
        rd_register != "" &&
        rs1_register != "" &&
        imm_value != ""
      ) {
        instruction =
          operation + " " + rd_register + " " + rs1_register + " " + imm_value;
        //alert("The RISC-V Instruction is: " + instruction);
        return instruction;
      } else {
        alert("Error Not a Valid RISC-V Instruction");
        return instruction;
      }
    } else if (format == "S") {
      let imm1 = parser(input, 20, 24);
      let funct3 = parser(input, 17, 19);
      let rs1 = parser(input, 12, 16);
      let rs2 = parser(input, 7, 11);
      let imm2 = parser(input, 0, 6);

      let operation = "";
      let rs1_register = "";
      let rs2_register = "";
      let imm_value = "";

      //imm to digit
      let imm = imm2 + imm1;
      imm_value = binary_to_digit(imm);

      //binary to digit for registers
      let rs1_digit = binary_to_digit(rs1);
      let rs2_digit = binary_to_digit(rs2);

      //digit to register
      rs1_register = digit_to_register(rs1_digit);
      rs2_register = digit_to_register(rs2_digit);

      //find operation using funct3
      if (opcode == "0100011") {
        if (funct3 == "000") {
          operation = "sb";
        } else if (funct3 == "001") {
          operation = "sh";
        } else if (funct3 == "010") {
          operation = "sw";
        } else if (funct3 == "011") {
          operation = "sd";
        }
      }

      //Putting it all together
      if (
        operation != "" &&
        rs1_register != "" &&
        rs2_register != "" &&
        imm_value != ""
      ) {
        let instruction =
          operation + " " + rs1_register + " " + rs2_register + "Offset(bytes): " + imm_value;
        alert("The RISC-V Instruction is: " + instruction);
        return instruction;
      } else {
        alert("Error Not a Valid RISC-V Instruction");
        return instruction;
      }
    } else if (format == "SB") {
      let imm3 = parser(input, 24, 24);
      let imm1 = parser(input, 20, 23);
      let funct3 = parser(input, 17, 19);
      let rs1 = parser(input, 12, 16);
      let rs2 = parser(input, 7, 11);
      let imm2 = parser(input, 1, 6);
      let imm4 = parser(input, 0, 0);

      let operation = "";
      let rs1_register = "";
      let rs2_register = "";
      let imm_value = "";

      //imm to digit
      let imm = imm4 + imm3 + imm2 + imm1 + "0";
      imm_value = binary_to_digit(imm);

      //binary to digit for registers
      let rs1_digit = binary_to_digit(rs1);
      let rs2_digit = binary_to_digit(rs2);

      //digit to register
      rs1_register = digit_to_register(rs1_digit);
      rs2_register = digit_to_register(rs2_digit);

      //find operation using funct3
      if (opcode == "1100011") {
        if (funct3 == "000") {
          operation = "beq";
        } else if (funct3 == "001") {
          operation = "bne";
        } else if (funct3 == "100") {
          operation = "blt";
        } else if (funct3 == "101") {
          operation = "bge";
        } else if (funct3 == "110") {
          operation = "bltu";
        } else if (funct3 == "111") {
          operation = "bgeu";
        }
      }

      //Putting it all together
      if (
        operation != "" &&
        rs1_register != "" &&
        rs2_register != "" &&
        imm_value != ""
      ) {
        let instruction =
          operation + " " + rs1_register + " " + rs2_register + "Offset(bytes): " + imm_value;
        alert("The RISC-V Instruction is: " + instruction);
        return instruction;
      } else {
        alert("Error Not a Valid RISC-V Instruction");
        return instruction;
      }
    } else if (format == "U") {
      let rd = parser(input, 24, 24);
      let imm1 = parser(input, 0, 23);

      let operation = "";
      let rd_register = "";
      let imm_value = "";

      //imm to digit sign extended???
      let imm = imm1 + "000000000000";
      imm_value = binary_to_digit(imm);
      
      //binary to digit for registers
      let rd_digit = binary_to_digit(rd);

      //digit to register
      rd_register = digit_to_register(rd_digit);

      if (opcode == "0010111") {
        operation == "auipc";
      } else if (opcode == "0110111") {
        operation == "lui";
      }

      //Putting it all together
      if (operation != "" && imm_value != "") {
        let instruction = operation + " " + imm_value;
        alert("The RISC-V Instruction is: " + instruction);
        return instruction;
      } else {
        alert("Error Not a Valid RISC-V Instruction");
        return instruction;
      }
    } else if (format == "UJ") {
      let rd = parser(input, 20, 24);
      let imm3 = parser(input, 16, 19);
      let imm2 = parser(input, 15, 15);
      let imm1 = parser(input, 1, 14);
      let imm4 = parser(input, 0, 0);

      let operation = "";
      let rd_register = "";
      let imm_value = "";

      //imm to digit
      let imm1_rev = reverse_string(imm1);
      let imm =  imm4+ imm3 + imm2 + imm1 + "0";
      imm_value = binary_to_digit(imm);

      //binary to digit for registers
      let rd_digit = binary_to_digit(rd);

      //digit to register
      rd_register = digit_to_register(rd_digit);
      alert(rd_register);
      alert(imm_value);
      alert(opcode);

      if (opcode == "1101111") {
        operation = "jal";
      } 

      //Putting it all together
      if (operation != "" && imm_value != "") {
        let instruction = operation + " " + rd_register + "Offset(bytes): " + imm_value;
        alert("The RISC-V Instruction is: " + instruction);
        return instruction;
      } else {
        alert("Error Not a Valid RISC-V Instruction");
        return instruction;
      }
    } else {
      alert("Error Not a Valid RISC-V Instruction");
      return instruction;
    }
  } else {
    alert("Error Not a Valid Input(Input should be of length 32)");
    return instruction;
  }
}

function hex_to_riscv(input, instruction) {
  if(input.length == 8){
    for (let i = 0; i < 8; i++) {
      if ((input.charAt(i) != "A") & (input.charAt(i) != "B") & (input.charAt(i) != "C") & (input.charAt(i) != "D") & (input.charAt(i) != "E") & (input.charAt(i) != "F") & (input.charAt(i) != "a") & (input.charAt(i) != "b") & (input.charAt(i) != "c") & (input.charAt(i) != "d") & (input.charAt(i) != "e") & (input.charAt(i) != "f") & (input.charAt(i) != "0") & (input.charAt(i) != "1") & (input.charAt(i) != "2") & (input.charAt(i) != "3") & (input.charAt(i) != "4") & (input.charAt(i) != "5") & (input.charAt(i) != "6") & (input.charAt(i) != "7") & (input.charAt(i) != "8") & (input.charAt(i) != "9")) {
        alert("Error Not a Valid Hex String");
        return instruction;
      }
    }
    let binary = hex_to_binary(input);
    instruction = binary_to_riscv(binary, instruction);
    return instruction;
  }
  else {
    alert("Error Not a Valid Input(Input should be of length 8)");
    return instruction;
  }
}

function parser(input, p1, p2) {
  if ((p1 >= 0) & (p2 < input.length)) {
    let word = input.slice(p1, p2 + 1);
    return word;
  }
}

function binary_to_digit(input) {
  let digit = parseInt(input, 2);
  return digit;
}

function digit_to_register(input) {
  if (input == 0) {
    return "x0";
  } else if (input == 1) {
    return "ra";
  } else if (input == 2) {
    return "sp";
  } else if (input == 3) {
    return "gp";
  } else if (input == 4) {
    return "tp";
  } else if (input == 5) {
    return "t0";
  } else if (input == 6) {
    return "t1";
  } else if (input == 7) {
    return "t2";
  } else if (input == 8) {
    return "s0";
  } else if (input == 9) {
    return "s1";
  } else if (input == 10) {
    return "a0";
  } else if (input == 11) {
    return "a1";
  } else if (input == 12) {
    return "a2";
  } else if (input == 13) {
    return "a3";
  } else if (input == 14) {
    return "a4";
  } else if (input == 15) {
    return "a5";
  } else if (input == 16) {
    return "a6";
  } else if (input == 17) {
    return "a7";
  } else if (input == 18) {
    return "s2";
  } else if (input == 19) {
    return "s3";
  } else if (input == 20) {
    return "s4";
  } else if (input == 21) {
    return "s5";
  } else if (input == 22) {
    return "s6";
  } else if (input == 23) {
    return "s7";
  } else if (input == 24) {
    return "s8";
  } else if (input == 25) {
    return "s9";
  } else if (input == 26) {
    return "s10";
  } else if (input == 27) {
    return "s11";
  } else if (input == 28) {
    return "t3";
  } else if (input == 29) {
    return "t4";
  } else if (input == 30) {
    return "t5";
  } else if (input == 31) {
    return "t6";
  }
}

function opcode_to_format(opcode) {
  if (
    opcode == "0000011" ||
    opcode == "0001111" ||
    opcode == "0010011" ||
    opcode == "0011011" ||
    opcode == "1100111" ||
    opcode == "1110011"
  ) {
    return "I";
  } else if (opcode == "0010111" || opcode == "0110111") {
    return "U";
  } else if (opcode == "0100011") {
    return "S";
  } else if (opcode == "0110011" || opcode == "0111011") {
    return "R";
  } else if (opcode == "1100011") {
    return "SB";
  } else if (opcode == "1101111") {
    return "UJ";
  }
}

function string_reverse(input) {
  let reversed = "";
  for (let i = input.length - 1; i >= 0; i--) {
    reversed += input[i];
  }
  return reversed;
}

function hex_to_binary(input) {
  let binary = "";
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) == "0") {
      binary += "0000";
    } else if (input.charAt(i) == "1") {
      binary += "0001";
    } else if (input.charAt(i) == "2") {
      binary += "0010";
    } else if (input.charAt(i) == "3") {
      binary += "0011";
    } else if (input.charAt(i) == "4") {
      binary += "0100";
    } else if (input.charAt(i) == "5") {
      binary += "0101";
    } else if (input.charAt(i) == "6") {
      binary += "0110";
    } else if (input.charAt(i) == "7") {
      binary += "0111";
    } else if (input.charAt(i) == "8") {
      binary += "1000";
    } else if (input.charAt(i) == "9") {
      binary += "1001";
    } else if (input.charAt(i) == "A") {
      binary += "1010";
    } else if (input.charAt(i) == "B") {
      binary += "1011";
    } else if (input.charAt(i) == "C") {
      binary += "1100";
    } else if (input.charAt(i) == "D") {
      binary += "1101";
    } else if (input.charAt(i) == "E") {
      binary += "1110";
    } else if (input.charAt(i) == "F") {
      binary += "1111";
    }
  }
  return binary;
}
