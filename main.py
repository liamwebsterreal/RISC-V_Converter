

def parser(instruction, first, last):
    if first >= 0 and last <= 32:
        parse = instruction[first : last]
        return parse
    else:
        print("Error! Check bounds!")
        exit()


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

    
def main():
# (0->6 | 7->11 | 12->16 | 17->19 | 20->24 | 25->32)

    instruction = "11111011110001110001101100100011"

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

    
if __name__ == "__main__":
    main()