---
search:
  exclude: true
---

# 2023 年试卷题解

<div class="lock-gate" data-password="chenzhuoyingzhan">

<strong>本页需要密码才能查看。</strong>

<input id="lock-pass" type="password" placeholder="输入访问密码" autocomplete="off" />
<button id="lock-btn" type="button">解锁</button>
<p id="lock-msg"></p>

</div>

原卷：[2023 年考题](../../final/2023.pdf)

## 第 1 题 · 敲笨钟

### 思路

把每句话按逗号拆成上下两半，去掉句末的句号；分别取两半的最后一个拼音，判断是否都以 `ong` 结尾。都满足就把下半句最后三个拼音替换成 `qiao ben zhong`，否则输出 `Skipped`。按空格切词即可，复杂度 $O(|S|)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

bool endsWithOng(const string &w)
{
    int len = w.size();
    if (len < 3)
        return false;
    return w.substr(len - 3) == "ong";
}

int main()
{
    int n;
    cin >> n;
    cin.ignore();

    for (int t = 0; t < n; t++)
    {
        string line;
        getline(cin, line);
        if (!line.empty() && line.back() == '.')
            line.pop_back();

        int comma = line.find(',');
        string firstPart = line.substr(0, comma);
        string secondPart = line.substr(comma + 1);

        vector<string> fw, sw;
        {
            string cur;
            for (char ch : firstPart)
            {
                if (ch == ' ')
                {
                    if (!cur.empty())
                    {
                        fw.push_back(cur);
                        cur.clear();
                    }
                }
                else
                    cur += ch;
            }
            if (!cur.empty())
                fw.push_back(cur);
        }
        {
            string cur;
            for (char ch : secondPart)
            {
                if (ch == ' ')
                {
                    if (!cur.empty())
                    {
                        sw.push_back(cur);
                        cur.clear();
                    }
                }
                else
                    cur += ch;
            }
            if (!cur.empty())
                sw.push_back(cur);
        }

        if (endsWithOng(fw.back()) && endsWithOng(sw.back()))
        {
            cout << firstPart << ",";
            int keep = sw.size() - 3;
            for (int i = 0; i < keep; i++)
                cout << " " << sw[i];
            cout << " qiao ben zhong.\n";
        }
        else
        {
            cout << "Skipped\n";
        }
    }
    return 0;
}
```

## 第 2 题 · 求解四次一元方程

### 思路

与 2022 年第 8 题同一套做法：函数在 $[L, R]$ 上严格单调，二分判断根在哪一半，迭代足够多次后输出中点，保留 6 位小数。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

double a, b, c, d, e, k, L, R;

double f(double x)
{
    return a * x * x * x * x + b * x * x * x + c * x * x + d * x + e - k;
}

int main()
{
    cin >> a >> b >> c >> d >> e >> k >> L >> R;

    double fl = f(L);
    for (int step = 0; step < 200; step++)
    {
        double mid = (L + R) / 2;
        double fm = f(mid);
        if (fl * fm <= 0)
            R = mid;
        else
        {
            L = mid;
            fl = fm;
        }
    }

    printf("%.6f\n", (L + R) / 2);
    return 0;
}
```

## 第 3 题 · 求化学式分子量

### 思路

与 2022 年第 2 题同样处理：扫描字符串，元素后跟数字就乘上去；遇到括号先算括号内的质量，再乘括号后的数字。括号不嵌套，扫一遍即可。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    string s;
    cin >> s;

    long long total = 0;
    int i = 0, len = s.size();
    while (i < len)
    {
        if (s[i] == '(')
        {
            i++;
            long long group = 0;
            while (s[i] != ')')
            {
                char e = s[i];
                long long w = (e == 'H' ? 1 : (e == 'C' ? 12 : 16));
                i++;
                long long cnt = 0;
                while (i < len && isdigit(s[i]))
                {
                    cnt = cnt * 10 + (s[i] - '0');
                    i++;
                }
                if (cnt == 0)
                    cnt = 1;
                group += w * cnt;
            }
            i++;
            long long mult = 0;
            while (i < len && isdigit(s[i]))
            {
                mult = mult * 10 + (s[i] - '0');
                i++;
            }
            if (mult == 0)
                mult = 1;
            total += group * mult;
        }
        else
        {
            char e = s[i];
            long long w = (e == 'H' ? 1 : (e == 'C' ? 12 : 16));
            i++;
            long long cnt = 0;
            while (i < len && isdigit(s[i]))
            {
                cnt = cnt * 10 + (s[i] - '0');
                i++;
            }
            if (cnt == 0)
                cnt = 1;
            total += w * cnt;
        }
    }

    cout << total << "\n";
    return 0;
}
```

## 第 4 题 · 王子与公主

### 思路

这是一道结论题。若说真话的人数 $a$ 不超过「反对 + 中立」$b + c$，无论怎么问都无法保证确定公主的位置，输出 `NO`；否则可以靠多数票确定，最少要问 $2(b+c)+1$ 次：先把 $b+c$ 个不可靠的人排除掉，再多问一次得到可靠答案。特别地，当 $a = 1$、$b = c = 0$ 时只有公主一人，不需要提问，输出 $0$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    long long a, b, c;
    cin >> a >> b >> c;

    if (a <= b + c)
    {
        cout << "NO\n";
    }
    else
    {
        cout << "YES\n";
        if (a == 1 && b == 0 && c == 0)
            cout << 0 << "\n";
        else
            cout << 2 * (b + c) + 1 << "\n";
    }
    return 0;
}
```

## 第 5 题 · 小明打字

### 思路

用两个双端队列模拟光标：`left` 存光标前面的字符，`right` 存光标后面的字符（`right` 的第一个就是光标所在位置的字符）。Home/End 就把一侧整体搬到另一侧；左右移动各搬一个；插入模式往 `left` 末尾加字符，替换模式修改 `right` 的第一个字符再把它移到 `left`；退格删掉 `left` 末尾。每个按键 $O(1)$，复杂度 $O(|S|)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    string s;
    getline(cin, s);

    deque<char> left, right;
    bool insertMode = true;

    for (char ch : s)
    {
        if (ch == '[')
        {
            while (!left.empty())
            {
                right.push_front(left.back());
                left.pop_back();
            }
        }
        else if (ch == ']')
        {
            while (!right.empty())
            {
                left.push_back(right.front());
                right.pop_front();
            }
        }
        else if (ch == '{')
        {
            if (!left.empty())
            {
                right.push_front(left.back());
                left.pop_back();
            }
        }
        else if (ch == '}')
        {
            if (!right.empty())
            {
                left.push_back(right.front());
                right.pop_front();
            }
        }
        else if (ch == '-')
        {
            insertMode = !insertMode;
        }
        else if (ch == '=')
        {
            if (!left.empty())
                left.pop_back();
        }
        else
        {
            if (insertMode)
            {
                left.push_back(ch);
            }
            else
            {
                if (right.empty())
                    left.push_back(ch);
                else
                {
                    right.front() = ch;
                    left.push_back(right.front());
                    right.pop_front();
                }
            }
        }
    }

    for (char ch : left)
        cout << ch;
    for (char ch : right)
        cout << ch;
    cout << "\n";
    return 0;
}
```

## 第 6 题 · 月饼

### 思路

每种月饼的性价比是「总售价 ÷ 库存」，按性价比从高到低贪心：能卖完就卖完，库存不够需求量就卖一部分。排序 $O(N\log N)$，总收益保留两位小数。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Item
{
    double stock;
    double price;
};

int n;
double D;
Item it[1005];

bool cmp(Item x, Item y)
{
    return x.price / x.stock > y.price / y.stock;
}

int main()
{
    cin >> n >> D;
    for (int i = 0; i < n; i++)
        cin >> it[i].stock;
    for (int i = 0; i < n; i++)
        cin >> it[i].price;

    sort(it, it + n, cmp);

    double profit = 0;
    for (int i = 0; i < n && D > 0; i++)
    {
        if (it[i].stock <= D)
        {
            profit += it[i].price;
            D -= it[i].stock;
        }
        else
        {
            profit += it[i].price / it[i].stock * D;
            D = 0;
        }
    }

    printf("%.2f\n", profit);
    return 0;
}
```

## 第 7 题 · 质因数分解

### 思路

输入是多组数据，读到文件结束为止。每个数从 $2$ 试除到 $\sqrt{N}$，统计每个质因数的指数；最后剩下的 $N>1$ 也作为一个质因数。输出用 `2^2*3^2` 这种不带空格的格式。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    long long n;
    while (cin >> n)
    {
        vector<pair<long long, int>> res;
        for (long long p = 2; p * p <= n; p++)
        {
            if (n % p != 0)
                continue;
            int cnt = 0;
            while (n % p == 0)
            {
                n /= p;
                cnt++;
            }
            res.push_back({p, cnt});
        }
        if (n > 1)
            res.push_back({n, 1});

        for (int i = 0; i < (int)res.size(); i++)
        {
            if (i > 0)
                cout << "*";
            cout << res[i].first;
            if (res[i].second > 1)
                cout << "^" << res[i].second;
        }
        cout << "\n";
    }
    return 0;
}
```

## 第 8 题 · 幸运 ID

### 思路

先分别算出前三位和后三位的数字和。若相等答案是 $0$；否则把「每个位置最多能改变多少」收集起来：想减小左半边就取该位数字本身，想增大左半边就取 $9 - d$（右半边同理反过来）。把这些贡献从大到小排序，贪心取到补足差值为止，取的个数就是答案。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    string s;
    cin >> s;

    int s1 = 0, s2 = 0;
    for (int i = 0; i < 3; i++)
        s1 += s[i] - '0';
    for (int i = 3; i < 6; i++)
        s2 += s[i] - '0';

    if (s1 == s2)
    {
        cout << 0 << "\n";
        return 0;
    }

    int diff = abs(s1 - s2);
    vector<int> gain;
    for (int i = 0; i < 3; i++)
    {
        int d = s[i] - '0';
        gain.push_back(s1 > s2 ? d : 9 - d);
    }
    for (int i = 3; i < 6; i++)
    {
        int d = s[i] - '0';
        gain.push_back(s1 > s2 ? 9 - d : d);
    }

    sort(gain.begin(), gain.end(), greater<int>());

    int sum = 0, cnt = 0;
    for (int g : gain)
    {
        if (sum >= diff)
            break;
        sum += g;
        cnt++;
    }

    cout << cnt << "\n";
    return 0;
}
```

