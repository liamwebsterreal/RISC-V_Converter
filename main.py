


def parser(instruction, first, last):
    if first >= 0 and last <= 32:
        parse = instruction[first : last]
        return parse
    else:
        print("Error! Check bounds!")
        exit()

def binaryToDecimal(n):
    return int(n,2)

def digitToRegister(digit):
    if digit == 0:
        return "x0"
    elif digit == 1:
        return "ra"
    elif digit == 2:
        return "sp"
    elif digit == 3:
        return "gp"
    elif digit == 4:
        return "tp"
    elif digit == 5:
        return "t0"
    elif digit == 6:
        return "t1"
    elif digit == 7:
        return "t2"
    elif digit == 8:
        return "s0"
    elif digit == 9:
        return "s1"
    elif digit == 10:
        return "a0"
    elif digit == 11:
        return "a1"
    elif digit == 12:
        return "a2"
    elif digit == 13:
        return "a3"
    elif digit == 14:
        return "a4"
    elif digit == 15:
        return "a5"
    elif digit == 16:
        return "a6"
    elif digit == 17:
        return "a7"
    elif digit == 18:
        return "s2"
    elif digit == 19:
        return "s3"
    elif digit == 20:
        return "s4"
    elif digit == 21:
        return "s5"
    elif digit == 22:
        return "s6"
    elif digit == 23:
        return "s7"
    elif digit == 24:
        return "s8"
    elif digit == 25:
        return "s9"
    elif digit == 26:
        return "s10"
    elif digit == 27:
        return "s11"
    elif digit == 28:
        return "t3"
    elif digit == 29:
        return "t4"
    elif digit == 30:
        return "t5"
    elif digit == 31:
        return "t6"



def format_getter(opcode):
    if opcode == '0000011':
        format = 'I'
    elif opcode == '0001111':
        format = 'I'
    elif opcode == '0010011':
        format = 'I'
    elif opcode == '0010111':
        format = 'U'
    elif opcode == '0011011':
        format = 'I'
    elif opcode == '0100011':
        format = 'S'
    elif opcode == '0110011':
        format = 'R'
    elif opcode == '0110111':
        format = 'U'
    elif opcode == '0111011':
        format = 'R'
    elif opcode == '1100011':
        format = 'SB'
    elif opcode == '1100111':
        format = 'I'
    elif opcode == '1101111':
        format = 'UJ'
    elif opcode == '1110011':
        format = 'I'
    else:
        print("Error! Incorrect OPCODE")
        exit()
    return format

def hex_converter(instruction):
    str = "0"
    if len(instruction) == 8:
        for x in instruction:
            if x == 0:
                str = str + "0000"
            elif x == '1':
                str = str + "0001"
            elif x == '2':
                str = str + "0010"
            elif x == '3':
                str = str + "0011"
            elif x == '4':
                str = str + "0100"
            elif x == '5':
                str = str + "0101"
            elif x == '6':
                str = str + "0110"
            elif x == '7':
                str = str + "0111"
            elif x == '8':
                str = str + "1000"
            elif x == '9':
                str = str + "1001"
            elif x == 'A':
                str = str + "1010"
            elif x == 'B':
                str = str + "1011"
            elif x == 'C':
                str = str + "1100"
            elif x == 'D':
                str = str + "1101"
            elif x == 'E':
                str = str + "1110"
            elif x == 'F':
                str = str + "1111"
        return str[1:33]
    else:
        print("ERROR! Invalid Instruction")
        exit()

def binary_RISCV(funct7,rs2,rs1,funct3,rd,opcode):
    if opcode == '0110011':
        if funct3 == '000':
            if funct7 == '0000000':
                arg0 = "add "
            else:
                arg0 = "sub "
        elif funct3 == '001':
            arg0 = "sll "
        elif funct3 == '010':
            arg0 = "slt "
        elif funct3 == '011':
            arg0 = "sltu" 
        elif funct3 == '100':
            arg0 = "xor "
        elif funct3 == '101':
            if funct7 == '0000000':
                arg0 = "srl "
            else:
                arg0 = "sra "
        elif funct3 == '110':
            arg0 = "or "
        elif funct3 == '111':
            arg0 = "and "
    elif opcode == '0111011':
        if funct3 == '000':
            if funct7 == '0000000':
                arg0 = "addw "
            else: 
                arg0 = "subw "
        elif funct3 == '001':
            arg0 = "sllw "
        elif funct3 == '101':
            if funct7 == '0000000':
                arg0 = "srlw "
            else:
                arg0 = "sraw "
    arg1 = digitToRegister(binaryToDecimal(rd))
    arg2 = digitToRegister(binaryToDecimal(rs1))
    arg3 = digitToRegister(binaryToDecimal(rs2))
    return arg0 + arg1 + " " + arg2 + " "  + arg3

    

    
def main():
# (0->6 | 7->11 | 12->16 | 17->19 | 20->24 | 25->32)

    inst = "00000000101001011000001010110011"
    if len(inst) == 8:
        instruction = hex_converter(inst)
    else:
        instruction = inst
    print(instruction)
    opcode = parser(instruction, 25, 32)
    rd = parser(instruction, 20, 25)
    format = format_getter(opcode)
    print("Format: ", format)
    print("Opcode: ",opcode)
    print("Return Address: ", rd)
    if format == "I" or format == "S" or format == "R" or format == "SB":
        funct3 = parser(instruction, 17, 20)
        rs1 = parser(instruction, 12, 17)
        print("Funct3: ", funct3)
        print("RS1: ",rs1)
    if format == "R" or format == "S" or format == "SB": 
        rs2 = parser(instruction,7,12)
        funct7 = parser(instruction, 0, 7)
        print("RS2: ", rs2)
        print("Funct7: ",funct7)
    elif format == "I":
        funct7 == parser(instruction, 0, 11)
        print("Funct7: ",funct7)
    elif format == "U" or format == "UJ":
        funct7 == parser(instruction, 0, 19)
        print("Funct7: ", funct7)
    
    #We are split up and now we need to go from binary to RISC-V inst

    if format == 'R':
        riscv = binary_RISCV(funct7,rs2,rs1,funct3,rd,opcode)
    else:
        riscv = "poo"
    print(riscv)
    

    
if __name__ == "__main__":
    main()