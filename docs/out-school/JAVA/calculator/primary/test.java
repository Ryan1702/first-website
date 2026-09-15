package calculator.primary;

import java.util.Scanner;

public class test {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int x = scan.nextInt();
        String op = scan.next();
        int y = scan.nextInt();
        if (op.equals("+"))
            System.out.println(x + y);
        else if (op.equals("-"))
            System.out.println(x - y);
        else if (op.equals("*"))
            System.out.println(x * y);
        else if (op.equals("/"))
            System.out.println(x / y);
        else
            System.out.println("Error!");
        scan.close();
    }
}