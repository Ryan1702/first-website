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

## 第 1 题 · 螺旋矩阵

### 思路

模拟「向右 → 向下 → 向左 → 向上」四个方向：每次走一步并标记访问，如果下一步越界或者已经走过，就换下一个方向。总共走 $m \times n$ 步，复杂度 $O(mn)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

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

## 第 3 题 · 购票插队问题

### 思路

直接用数组模拟队伍，每个元素记录「编号、怒气值、是否插队进来」。插入时先找到 $x$ 的位置，插到它前面，再把它后面所有人的怒气值加 $y$；每次操作后检查总怒气是否严格大于 $M$，若是就删掉所有插队者并把怒气清零。$N \le 1000$，单次操作 $O(N)$ 足够。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Node
{
    int id;
    int anger;
    bool inserted;
};

int n;
long long M;

int main()
{
    cin >> n >> M;

    vector<Node> q;
    long long sum = 0;

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
            int x, y;
            cin >> x >> y;

            int pos = 0;
            for (int k = 0; k < (int)q.size(); k++)
                if (q[k].id == x)
                    pos = k;

            q.insert(q.begin() + pos, {i, 0, true});

            for (int k = pos + 1; k < (int)q.size(); k++)
            {
                q[k].anger += y;
                sum += y;
            }
        }

        if (sum > M)
        {
            vector<Node> nq;
            for (int k = 0; k < (int)q.size(); k++)
            {
                if (!q[k].inserted)
                {
                    Node t = q[k];
                    t.anger = 0;
                    nq.push_back(t);
                }
            }
            q = nq;
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

从第 $0$ 位开始 DFS，每次按 $1$ 到 $N$ 的顺序尝试没用过的数字，用 `used` 数组标记。因为按数值从小到大枚举，输出的顺序天然就是字典序。复杂度 $O(N \times N!)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

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

对每个位置 $i$，用单调栈求出「以 $a_i$ 为最小值的最长区间」$[L, R]$：左边找第一个严格更小的、右边找第一个小于等于的（这样区间不重复）。区间和用前缀和 $O(1)$ 求出，再乘 $a_i$ 更新答案。总复杂度 $O(n)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
long long a[100005];
long long pre[100005];
int st[100005];
int L[100005], R[100005];

int main()
{
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        pre[i] = pre[i - 1] + a[i];
    }

    int top = 0;
    for (int i = 1; i <= n; i++)
    {
        while (top > 0 && a[st[top]] >= a[i])
            top--;
        L[i] = (top == 0 ? 1 : st[top] + 1);
        st[++top] = i;
    }

    top = 0;
    for (int i = n; i >= 1; i--)
    {
        while (top > 0 && a[st[top]] > a[i])
            top--;
        R[i] = (top == 0 ? n : st[top] - 1);
        st[++top] = i;
    }

    long long ans = 0;
    for (int i = 1; i <= n; i++)
    {
        long long sum = pre[R[i]] - pre[L[i] - 1];
        long long val = a[i] * sum;
        if (val > ans)
            ans = val;
    }

    cout << ans << "\n";
    return 0;
}
```

## 第 6 题 · 讨厌的数

### 思路

先记录数组 A 中每个数最靠右出现的位置；然后对 B 里出现过的每个不同数字，只处理一次：删掉它在 A 中最右的那次出现。最后按原顺序输出没被删的元素。用 `map` 存「值 → 最右位置」，复杂度 $O((n+m)\log n)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m;
long long a[100005];
long long b[100005];
bool del_[100005];
map<long long, int> lastPos;

int main()
{
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        lastPos[a[i]] = i;
    }
    for (int i = 1; i <= m; i++)
        cin >> b[i];

    for (int i = 1; i <= m; i++)
    {
        auto it = lastPos.find(b[i]);
        if (it == lastPos.end())
            continue;
        int p = it->second;
        if (p != -1)
        {
            del_[p] = true;
            it->second = -1;
        }
    }

    bool first = true;
    for (int i = 1; i <= n; i++)
    {
        if (del_[i])
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

从 $2$ 开始试除到 $\sqrt{N}$：能整除就统计这个质因数的指数，按 `p ^ cnt` 输出（指数为 $1$ 时只输出 `p`）；试除结束后如果 $N > 1$，说明剩下的部分本身就是一个质因数。注意输出里 `^` 和 `*` 两边各有一个空格。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    long long n;
    cin >> n;

    bool first = true;
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

题目保证函数在 $[L, R]$ 上严格单调且有唯一解，所以直接二分：每次取中点，看 $f(L)$ 与 $f(\text{mid})$ 是否异号，异号说明根在左半边，否则在右半边；循环 $200$ 次后区间已经足够小，输出中点即可（保留 6 位小数）。

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

    double fl = f(L), fr = f(R);
    for (int step = 0; step < 200; step++)
    {
        double mid = (L + R) / 2;
        double fm = f(mid);
        if (fl * fm <= 0)
        {
            R = mid;
            fr = fm;
        }
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

