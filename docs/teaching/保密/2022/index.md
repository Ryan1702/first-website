---
search:
  exclude: true
---

# 2022 年试卷题解

<div class="lock-gate" data-password="biyousuocheng">

<strong>本页需要密码才能查看。</strong>

<input id="lock-pass" type="password" placeholder="输入访问密码" autocomplete="off" />
<button id="lock-btn" type="button">解锁</button>
<p id="lock-msg"></p>

</div>

原卷：[2022 年考题](../../final/2022.pdf)

## 难度顺序（由易到难）

| 顺序 | 题号 | 题目 | 算法 / 技巧 |
| :---: | :---: | --- | --- |
| 1 | 1 | 螺旋矩阵 | 方向模拟、访问标记、走满就停 |
| 2 | 4 | 输出 1-N 的全排列 | DFS 回溯、`used` 标记、天然字典序 |
| 3 | 7 | 分解质因数 | 试除法、指数统计、输出格式里的空格 |
| 4 | 2 | 化学分子质量 | 字符串扫描、括号内先累加再乘倍数 |
| 5 | 6 | 讨厌的数 | `map` 记录最右位置、每个数只删一次 |
| 6 | 3 | 购票插队问题 | 数组模拟队列、后缀加权、超阈值清空 |
| 7 | 5 | 区间最小数乘区间和的最大值 | 单调栈（STL `stack`）、前缀和、$O(n)$ |
| 8 | 8 | 解四次一元方程 | 浮点二分、`eps` 控制循环、保留 6 位小数 |

## 第 1 题 · 螺旋矩阵

### 思路

模拟「向右 → 向下 → 向左 → 向上」四个方向：每次走一步并标记访问，如果下一步越界或者已经走过，就换下一个方向。总共走 $m \times n$ 步，复杂度 $O(mn)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int m, n;
int a[15][15];
bool vis[15][15];

int main()
{
    cin >> m >> n;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            cin >> a[i][j];

    int dx[4] = {0, 1, 0, -1};
    int dy[4] = {1, 0, -1, 0};

    int x = 0, y = 0, dir = 0, cnt = 0;
    bool first = true;
    while (cnt < m * n)
    {
        if (!first)
            cout << " ";
        first = false;
        cout << a[x][y];
        vis[x][y] = true;
        cnt++;

        int nx = x + dx[dir], ny = y + dy[dir];
        if (nx < 0 || nx >= m || ny < 0 || ny >= n || vis[nx][ny])
        {
            dir = (dir + 1) % 4;
            nx = x + dx[dir];
            ny = y + dy[dir];
        }
        x = nx;
        y = ny;
    }
    cout << "\n";
    return 0;
}
```

## 第 2 题 · 化学分子质量

### 思路

从左往右扫描字符串：遇到元素就读取紧跟的数字（没有数字就当 $1$）；遇到左括号就把括号内的质量先累加，读完右括号再乘它后面的数字。题目保证括号不嵌套，所以只需要一层累加，复杂度 $O(|s|)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

// 元素符号对应的质量
ll weight(char c)
{
    if (c == 'H')
        return 1;
    if (c == 'C')
        return 12;
    return 16;
}

int main()
{
    string s;
    cin >> s;

    ll total = 0;
    int i = 0, len = s.size();
    while (i < len)
    {
        if (s[i] == '(')
        {
            i++;
            ll group = 0;
            while (s[i] != ')')
            {
                ll w = weight(s[i]);
                i++;
                ll cnt = 0;
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
            ll mult = 0;
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
            ll w = weight(s[i]);
            i++;
            ll cnt = 0;
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

## 第 3 题 · 购票插队问题

### 思路

用数组模拟队伍，每个人记录「编号、怒气值、是否插队进来」。插入时先找到 $x$ 的位置，插到它前面，再把它后面所有人的怒气值加 $y$；每次操作后检查总怒气是否严格大于 $M$，若是就删掉所有插队者并把怒气清零。$N \le 1000$，单次操作 $O(N)$ 足够。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

struct Person
{
    int id;
    ll anger;
    bool inserted;    // 是不是插队进来的
};

int main()
{
    int n;
    ll M;
    cin >> n >> M;

    vector<Person> q;
    ll sum = 0;

    for (int i = 1; i <= n; i++)
    {
        int op;
        cin >> op;
        if (op == 0)
        {
            q.push_back({i, 0, false});
        }
        else
        {
            int x;
            ll y;
            cin >> x >> y;

            int pos = 0;
            for (int k = 0; k < (int)q.size(); k++)
            {
                if (q[k].id == x)
                    pos = k;
            }

            q.insert(q.begin() + pos, {i, 0, true});

            // 插队位置后面的所有人都加怒气
            for (int k = pos + 1; k < (int)q.size(); k++)
            {
                q[k].anger += y;
                sum += y;
            }
        }

        // 怒气总和超过阈值：赶走所有插队者，怒气清零
        if (sum > M)
        {
            vector<Person> keep;
            for (Person p : q)
            {
                if (!p.inserted)
                {
                    p.anger = 0;
                    keep.push_back(p);
                }
            }
            q = keep;
            sum = 0;
        }
    }

    for (int k = 0; k < (int)q.size(); k++)
    {
        if (k > 0)
            cout << " ";
        cout << q[k].id;
    }
    cout << "\n";
    cout << sum << "\n";
    return 0;
}
```

## 第 4 题 · 输出 1-N 的全排列

### 思路

从第 $0$ 位开始 DFS，每次按 $1$ 到 $N$ 的顺序尝试没用过的数字，用 `used` 数组标记。因为按数值从小到大枚举，输出顺序天然就是字典序。复杂度 $O(N \times N!)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n;
int a[10];
bool used[10];

void dfs(int dep)
{
    if (dep == n)
    {
        for (int i = 0; i < n; i++)
        {
            if (i > 0)
                cout << " ";
            cout << a[i];
        }
        cout << "\n";
        return;
    }
    for (int v = 1; v <= n; v++)
    {
        if (used[v])
            continue;
        used[v] = true;
        a[dep] = v;
        dfs(dep + 1);
        used[v] = false;
    }
}

int main()
{
    cin >> n;
    dfs(0);
    return 0;
}
```

## 第 5 题 · 区间最小数乘区间和的最大值

### 思路

对每个位置 $i$，用单调栈（STL 的 `stack`）求出「以 $a_i$ 为最小值的最长区间」$[L, R]$：左边找第一个严格更小的、右边找第一个小于等于的（这样区间不重复）。区间和用前缀和 $O(1)$ 求出，再乘 $a_i$ 更新答案。总复杂度 $O(n)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n;
ll a[100005];
ll pre[100005];     // 前缀和
int L[100005], R[100005];

int main()
{
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        pre[i] = pre[i - 1] + a[i];
    }

    // 左边第一个严格更小的位置
    stack<int> st;
    for (int i = 1; i <= n; i++)
    {
        while (!st.empty() && a[st.top()] >= a[i])
            st.pop();
        L[i] = st.empty() ? 1 : st.top() + 1;
        st.push(i);
    }

    // 右边第一个小于等于的位置（这样区间不会重复计算）
    st = stack<int>();
    for (int i = n; i >= 1; i--)
    {
        while (!st.empty() && a[st.top()] > a[i])
            st.pop();
        R[i] = st.empty() ? n : st.top() - 1;
        st.push(i);
    }

    ll ans = 0;
    for (int i = 1; i <= n; i++)
    {
        ll sum = pre[R[i]] - pre[L[i] - 1];
        ans = max(ans, a[i] * sum);
    }

    cout << ans << "\n";
    return 0;
}
```

## 第 6 题 · 讨厌的数

### 思路

先记录数组 A 中每个数最靠右出现的位置；然后对 B 里出现过的每个不同数字只处理一次：删掉它在 A 中最右的那次出现。最后按原顺序输出没被删的元素。用 `map` 存「值 → 最右位置」，复杂度 $O((n+m)\log n)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n, m;
ll a[100005];
ll b[100005];
bool removed[100005];

int main()
{
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    for (int i = 1; i <= m; i++)
        cin >> b[i];

    // 记录 A 中每个数最靠右的位置
    map<ll, int> lastPos;
    for (int i = 1; i <= n; i++)
        lastPos[a[i]] = i;

    // 每个讨厌的数只删一次：删它在 A 中最靠右的那次出现
    for (int i = 1; i <= m; i++)
    {
        auto it = lastPos.find(b[i]);
        if (it == lastPos.end())
            continue;
        if (it->second == -1)
            continue;
        removed[it->second] = true;
        it->second = -1;       // 标记这个数已经处理过
    }

    bool first = true;
    for (int i = 1; i <= n; i++)
    {
        if (removed[i])
            continue;
        if (!first)
            cout << " ";
        first = false;
        cout << a[i];
    }
    if (first)
        cout << "EMPTY";
    cout << "\n";
    return 0;
}
```

## 第 7 题 · 分解质因数

### 思路

从 $2$ 开始试除到 $\sqrt{N}$：能整除就统计这个质因数的指数，按 `p ^ cnt` 输出（指数为 $1$ 时只输出 `p`）；试除结束后如果 $N > 1$，说明剩下的部分本身就是质数。注意输出里 `^` 和 `*` 两边各有一个空格。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main()
{
    ll n;
    cin >> n;

    bool first = true;
    for (ll p = 2; p * p <= n; p++)
    {
        if (n % p != 0)
            continue;
        int cnt = 0;
        while (n % p == 0)
        {
            n /= p;
            cnt++;
        }
        if (!first)
            cout << " * ";
        first = false;
        cout << p;
        if (cnt > 1)
            cout << " ^ " << cnt;
    }
    if (n > 1)
    {
        if (!first)
            cout << " * ";
        cout << n;
    }
    cout << "\n";
    return 0;
}
```

## 第 8 题 · 解四次一元方程

### 思路

题目保证函数在 $[L, R]$ 上严格单调且有唯一解，所以直接二分：每次取中点，看 $f(L)$ 与 $f(\text{mid})$ 是否异号，异号说明根在左半边，否则在右半边。循环条件写成 `while (R - L > eps)`（`eps = 1e-7`），比固定迭代次数更直接，也更容易根据精度调整。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

double a, b, c, d, e, k, L, R;
const double eps = 1e-7;

double f(double x)
{
    return a * x * x * x * x + b * x * x * x + c * x * x + d * x + e - k;
}

int main()
{
    cin >> a >> b >> c >> d >> e >> k >> L >> R;

    double fl = f(L), fr = f(R);
    while (R - L > eps)
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

