package calculator.primary;

import java.util.Scanner;

public class plus {
    public static void main(String[] argc) {
        Scanner scan = new Scanner(System.in);
        String s = scan.next();
        int now = 0, num = -1;
        char ch = '$';
        for (int i = 0; i < s.length(); i++) {
            if (Character.isDigit(s.charAt(i)))
                now = now * 10 + s.charAt(i) - '0';
            else {
                ch = s.charAt(i);
                num = now;
                now = 0;
            }
        }
        if (ch == '$')
            System.out.println("Error!");
        else {
            if (ch == '+')
                System.out.println(num + now);
            else if (ch == '-')
                System.out.println(num - now);
            else if (ch == '*')
                System.out.println(num * now);
            else if (ch == '/')
                System.out.println(num / now);
            else
                System.out.println("Error!");
        }
        scan.close();
    }
}
