function binary_to_riscv(input) {
  if (input.length == 32) {
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

      //binary to digit for registers
      let rd_digit = binary_to_digit(rd);
      let rs1_digit = binary_to_digit(rs1);
      let rs2_digit = binary_to_digit(rs2);
      //digit to register
      let rd_register = digit_to_register(rd_digit);
      let rs1_register = digit_to_register(rs1_digit);
      let rs2_register = digit_to_register(rs2_digit);

      //find operation using funct3 and funct7
      let operation = "";
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
      let instruction =
        operation + " " + rd_register + " " + rs1_register + " " + rs2_register;
      //alert("The RISC-V Instruction is: " + instruction);
      return instruction;
    } else if (format == "I") {
      let rd = parser(input, 20, 24);
      let funct3 = parser(input, 17, 19);
      let rs1 = parser(input, 12, 16);
      let imm = parser(input, 0, 11);

      //imm to digit
      let imm_digit = binary_to_digit(imm);
      let imm_hex = parseInt(imm_digit, 10).toString(16);
      let imm_hex_length = imm_hex.length;
      if (imm_hex_length == 1) {
        imm_hex = "0" + imm_hex;
      }
      let imm_hex_final = "0x" + imm_hex;

      //binary to digit for registers
      let rd_digit = binary_to_digit(rd);
      let rs1_digit = binary_to_digit(rs1);
      //digit to register
      let rd_register = digit_to_register(rd_digit);
      let rs1_register = digit_to_register(rs1_digit);

      //find operation using funct3
      let operation = "";
      if (opcode == "0010011") {
        if (funct3 == "000") {
          operation = "lb";
        } else if (funct3 == "001") {
          operation = "lh";
        } else if (funct3 == "010") {
          operation = "lw";
        } else if (funct3 == "100") {
          operation = "lbu";
        } else if (funct3 == "101") {
          operation = "lhu";
        }
      } else if (opcode == "0110011") {
        if (funct3 == "000") {
          operation = "addi";
        } else if (funct3 == "010") {
          operation = "slli";
        } else if (funct3 == "011") {
          operation = "slti";
        } else if (funct3 == "100") {
          operation = "xori";
        } else if (funct3 == "101") {
          operation = "sr";
        } else if (format == "S") {
        } else if (format == "SB") {
        } else if (format == "U") {
        } else if (format == "UJ") {
        }
      }
    }
  } else {
    alert("Error Not a Valid RISC-V Instruction");
  }
}

function riscv_to_binary(input) {
  alert("Value inside the input box 2 is: " + input);
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
