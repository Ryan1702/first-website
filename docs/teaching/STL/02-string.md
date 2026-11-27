# string 字符串

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // ========== 1. 构造、长度、判空 ==========
    string s1;
    string s2("hello");
    string s3 = "abcdef";
    string s4(5, '*');   // 5 个星号
    string s5(s3, 1, 3); // 从下标 1 开始，取 3 个字符：bcd

    cout << "s2 = " << s2 << "\n";
    cout << "s4 = " << s4 << "\n";
    cout << "s5 = " << s5 << "\n";
    cout << "size = " << s2.size() << "  length = " << s2.length() << "\n";
    cout << "empty? " << s2.empty() << "\n";

    // ========== 2. substr 重点！(pos, 长度) ==========
    string s = "abcdefgh";
    cout << "\nsubstr(2) -> " << s.substr(2) << "\n";     // 从下标 2 到末尾：cdefgh
    cout << "substr(1, 4) -> " << s.substr(1, 4) << "\n"; // 从下标 1 取 4 个：bcde

    // ========== 3. += append ==========
    s += "xyz";
    s += '!';
    s.append(2, '#');
    cout << "\n+= append 之后：" << s << "\n";

    // ========== 4. find / rfind ==========
    size_t pos1 = s.find('x');
    size_t pos2 = s.find("xyz");
    size_t pos3 = s.rfind('#');
    size_t pos4 = s.find("999"); // 找不到

    cout << "\n";
    if (pos1 != string::npos)
        cout << "找到 x：" << pos1 << "\n";
    if (pos2 != string::npos)
        cout << "找到 xyz：" << pos2 << "\n";
    if (pos3 != string::npos)
        cout << "最后一个 # 在：" << pos3 << "\n";
    if (pos4 == string::npos)
        cout << "找不到 999！\n";

    // ========== 5. find_first_of 字符集合！不是连续匹配 ==========
    string banana = "banana";
    size_t p = banana.find_first_of("na");
    cout << "\nbanana find_first_of(\"na\") = " << p << "\n";

    // ========== 6. erase ==========
    string e = "12345678";
    e.erase(1, 3); // 从下标 1 删除 3 个字符，剩下 15678
    cout << "\nerase 之后：" << e << "\n";

    // ========== 7. replace ==========
    string rp = "abc12345";
    rp.replace(3, 5, "##"); // 从下标 3 开始的 5 个字符替换成 "##"
    cout << "replace 之后：" << rp << "\n";

    // ========== 8. stoi stoll to_string ==========
    string numStr = "1234567890123";
    long long bigNum = stoll(numStr);
    string backStr = to_string(bigNum);
    cout << "\nstoll：" << bigNum << "\n";
    cout << "to_string(ll)：" << backStr << "\n";

    // ========== 9. sort reverse ==========
    string sr = "dcba";
    sort(sr.begin(), sr.end());
    cout << "\nsort：" << sr << "\n";
    reverse(sr.begin(), sr.end());
    cout << "reverse：" << sr << "\n";

    // ========== 10. getline 坑 ==========
    cout << "\n演示 getline 坑（注释掉避免干扰）\n";
    // int x;
    // cin >> x;
    // cin.ignore(1000, '\n'); // 吃掉当前行剩下的换行和多余字符
    // string line;
    // getline(cin, line);

    // ========== 11. 比较 ==========
    string a1 = "apple", a2 = "app";
    if (a2 < a1)
        cout << "\napp < apple 成立（字典序）\n";

    return 0;
}
```
