---
search:
  exclude: true
---

# 2025 年试卷题解

<div class="lock-gate" data-password="siluqingxi">

<strong>本页需要密码才能查看。</strong>

<input id="lock-pass" type="password" placeholder="输入访问密码" autocomplete="off" />
<button id="lock-btn" type="button">解锁</button>
<p id="lock-msg"></p>

</div>



原卷：[2025 年考题](../../final/2025.pdf)

## 第 1 题 · 判断素数

### 思路

数据范围是 $0 \le x \le 10^{10}$，最多 $T \le 100$ 个数。判断素数只需要试除到 $\sqrt{x}$：如果 $x$ 有大于 $\sqrt{x}$ 的因子，它必然还配有一个小于 $\sqrt{x}$ 的因子。这里 $\sqrt{10^{10}} = 10^5$，所以单个数最多试除 $10^5$ 次，$100$ 个数一共 $10^7$ 次取模，很轻松。

两个细节：$x < 2$（也就是 $0$ 和 $1$）不是素数，要单独判断；循环写成 `i * i <= x` 时，$i$ 必须是 `long long`，否则 $10^5$ 的平方会超出 `int` 的范围。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

bool isPrime(long long x)
{
    if (x < 2)
        return false;
    for (long long i = 2; i * i <= x; i++)
    {
        if (x % i == 0)
            return false;
    }
    return true;
}

int main()
{
    int T;
    cin >> T;
    while (T--)
    {
        long long x;
        cin >> x;
        if (isPrime(x))
            cout << "Yes\n";
        else
            cout << "No\n";
    }
    return 0;
}
```

## 第 2 题 · 加油站

### 思路

把坐标排序之后，最近的一对一定出现在相邻两项之间：如果 $x_i$ 与 $x_j$（$i < j$）之间还夹着别的加油站，那夹在中间的那个点离它们只会更近，不会更远。

所以做法是：排序 → 扫一遍求出所有相邻差的最小值 → 再扫一遍数有多少个相邻差正好等于这个最小值。

坐标可以到 $10^{12}$，差值要用 `long long`；题目允许多个加油站位置相同，这时最小距离是 $0$，按同样方法统计即可。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
long long a[100005];

int main()
{
    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> a[i];

    sort(a, a + n);

    long long best = LLONG_MAX;
    for (int i = 1; i < n; i++)
    {
        long long d = a[i] - a[i - 1];
        if (d < best)
            best = d;
    }

    long long cnt = 0;
    for (int i = 1; i < n; i++)
    {
        if (a[i] - a[i - 1] == best)
            cnt++;
    }

    cout << best << " " << cnt << "\n";
    return 0;
}
```

## 第 3 题 · 开关灯

### 思路

$N, M \le 9$，整个酒店最多 $81$ 盏灯，而操作次数 $Q \le 10^5$。最直接的办法就是老老实实模拟。

门牌号 $x$ 拆成：楼层 $r = \lfloor x/100 \rfloor$，位置 $c = x \bmod 10$（例如 $101$ 就是 $r = 1$、$c = 1$）。

每次按下开关，把第 $r$ 行和第 $c$ 列的所有灯取反，但交点 $(r, c)$ 只能改变一次 —— 所以判断条件写成「$i = r$ 或者 $j = c$ 就取反」，交点自然只被翻转一次。

单次操作 $O(NM)$，总复杂度 $O(QNM) \approx 8.1 \times 10^6$，可以过。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

bool on[10][10];

int main()
{
    int n, m, q;
    cin >> n >> m >> q;

    int ans = 0;
    for (int t = 0; t < q; t++)
    {
        int x;
        cin >> x;
        int r = x / 100;
        int c = x % 10;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                if (i == r || j == c)
                    on[i][j] = !on[i][j];
            }
        }

        int now = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= m; j++)
                if (on[i][j])
                    now++;
        if (now > ans)
            ans = now;
    }

    cout << ans << "\n";
    return 0;
}
```

## 第 4 题 · 艾莲的化学实验

### 思路

溶解关系是有向的，而且满足传递性，这正是「传递闭包」：先记录所有直接给出的边，再用 Floyd 把「经过中转点可以到达」的关系补全。

$N \le 200$，一次 Floyd 是 $O(N^3) = 8 \times 10^6$，$T \le 20$ 组最多 $1.6 \times 10^8$，可以接受。

每组数据读入查询的 $K$ 个药剂后两两检查：只要存在一对 $(u, v)$，$u$ 到不了 $v$ 且 $v$ 也到不了 $u$，就说明不是两两相溶，输出 `NO`；否则输出 `YES`。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

bool reach[205][205];

int main()
{
    int T;
    cin >> T;
    while (T--)
    {
        int n, m;
        cin >> n >> m;

        memset(reach, 0, sizeof(reach));
        for (int i = 1; i <= n; i++)
            reach[i][i] = true;

        for (int i = 0; i < m; i++)
        {
            int u, v;
            cin >> u >> v;
            reach[u][v] = true;
        }

        for (int k = 1; k <= n; k++)
            for (int i = 1; i <= n; i++)
                if (reach[i][k])
                    for (int j = 1; j <= n; j++)
                        if (reach[k][j])
                            reach[i][j] = true;

        int K;
        cin >> K;
        int q[205];
        for (int i = 0; i < K; i++)
            cin >> q[i];

        bool ok = true;
        for (int i = 0; i < K; i++)
        {
            for (int j = i + 1; j < K; j++)
            {
                if (!reach[q[i]][q[j]] && !reach[q[j]][q[i]])
                    ok = false;
            }
        }

        if (ok)
            cout << "YES\n";
        else
            cout << "NO\n";
    }
    return 0;
}
```

## 第 5 题 · 迷宫

### 思路

这道题的难点在输入格式：一共 $2N - 1$ 行，按行交替给出两种墙。

- 第 $i$ 行的前 $M - 1$ 个数是「同一行内相邻列」之间的墙，记作 `wallRight[i][j]`；
- 如果 $i < N$，紧接着的 $M$ 个数是「第 $i$ 行与第 $i+1$ 行」之间的墙，记作 `wallDown[i][j]`。

起点可以是第一行的任意格子，所以把第一行所有格子以距离 $0$ 一起入队，做一次 BFS；答案是最后一行里的最小距离。如果最后一行的格子一个都没被访问到，就输出 `No Way`。

$N, M \le 500$，点数 $2.5 \times 10^5$，每个点只看 4 个邻居，复杂度 $O(NM)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m;
int wallRight[505][505];
int wallDown[505][505];
int dist[505][505];

int qx[250005], qy[250005];

int main()
{
    cin >> n >> m;

    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= m - 1; j++)
            cin >> wallRight[i][j];
        if (i < n)
        {
            for (int j = 1; j <= m; j++)
                cin >> wallDown[i][j];
        }
    }

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dist[i][j] = -1;

    int head = 0, tail = 0;
    for (int j = 1; j <= m; j++)
    {
        dist[1][j] = 0;
        qx[tail] = 1;
        qy[tail] = j;
        tail++;
    }

    while (head < tail)
    {
        int x = qx[head], y = qy[head];
        head++;

        if (y - 1 >= 1 && wallRight[x][y - 1] == 0 && dist[x][y - 1] == -1)
        {
            dist[x][y - 1] = dist[x][y] + 1;
            qx[tail] = x; qy[tail] = y - 1; tail++;
        }
        if (y + 1 <= m && wallRight[x][y] == 0 && dist[x][y + 1] == -1)
        {
            dist[x][y + 1] = dist[x][y] + 1;
            qx[tail] = x; qy[tail] = y + 1; tail++;
        }
        if (x - 1 >= 1 && wallDown[x - 1][y] == 0 && dist[x - 1][y] == -1)
        {
            dist[x - 1][y] = dist[x][y] + 1;
            qx[tail] = x - 1; qy[tail] = y; tail++;
        }
        if (x + 1 <= n && wallDown[x][y] == 0 && dist[x + 1][y] == -1)
        {
            dist[x + 1][y] = dist[x][y] + 1;
            qx[tail] = x + 1; qy[tail] = y; tail++;
        }
    }

    int ans = -1;
    for (int j = 1; j <= m; j++)
    {
        if (dist[n][j] != -1)
        {
            if (ans == -1 || dist[n][j] < ans)
                ans = dist[n][j];
        }
    }

    if (ans == -1)
        cout << "No Way\n";
    else
        cout << ans << "\n";
    return 0;
}
```

## 第 6 题 · 兄弟数

### 思路

「右边第一个不小于自己的元素」，从右往左扫，用一个栈保存候选下标：

- 处理 $i$ 时，栈顶那些 $a$ 值比 $a_i$ 小的都可以弹掉 —— 它们在 $i$ 左边之后才轮到被查询，而且比 $a_i$ 小，不可能成为答案；
- 弹完之后，栈顶就是右边第一个满足 $a_j \ge a_i$ 的位置；如果栈空，说明右边没有这样的元素，记 $-1$；
- 最后把 $i$ 也压入栈。

每个下标最多进栈、出栈各一次，总复杂度 $O(n)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
long long a[100005];
int ans[100005];
int st[100005];

int main()
{
    cin >> n;
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    int top = 0;
    for (int i = n; i >= 1; i--)
    {
        while (top > 0 && a[st[top]] < a[i])
            top--;

        if (top == 0)
            ans[i] = -1;
        else
            ans[i] = st[top];

        top++;
        st[top] = i;
    }

    for (int i = 1; i <= n; i++)
    {
        if (i > 1)
            cout << " ";
        cout << ans[i];
    }
    cout << "\n";
    return 0;
}
```

## 第 7 题 · 最长子序列

### 思路

子序列只关心最大值和最小值，挑数的先后顺序不影响答案 —— 所以可以先把数组排序。

排序之后，任意一段连续区间 $[i, j]$ 里的元素都能组成一个合法子序列，最大值与最小值之差就是 $a_j - a_i$；反过来，最优解也可以补齐成某段连续区间（把落在两端之间的数全部选上，长度只会更长）。于是只要在排序后的数组里找最长的一段，使两端之差落在 $[L, R]$ 里。

枚举左端点 $i$，二分找最右边满足 $a_j - a_i \le R$ 的 $j$；如果此时还满足 $a_j - a_i \ge L$，就用 $j - i + 1$ 更新答案。总复杂度 $O(n \log n)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
long long L, R;
long long a[200005];

int main()
{
    cin >> n >> L >> R;
    for (int i = 0; i < n; i++)
        cin >> a[i];

    sort(a, a + n);

    int ans = 0;
    for (int i = 0; i < n; i++)
    {
        int lo = i, hi = n - 1, j = -1;
        while (lo <= hi)
        {
            int mid = (lo + hi) / 2;
            if (a[mid] <= a[i] + R)
            {
                j = mid;
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        if (j >= i && a[j] - a[i] >= L)
        {
            int len = j - i + 1;
            if (len > ans)
                ans = len;
        }
    }

    cout << ans << "\n";
    return 0;
}
```

## 第 8 题 · 染色

### 思路

先想清楚哪些点一定要花钱：

- 叶子不可能出现在任何一条路径的中间，所以每个叶子都必须作为某次操作的端点，必须付一次自己的权值；
- 反过来，只要把叶子两两配对（每次操作取两个叶子），路径的并集就能覆盖整棵树。理由是对任意非叶点 $v$，删掉 $v$ 之后至少有两个方向的子树里还有叶子，只要配对时不把「同一方向」的叶子配在一起，路径就一定会经过 $v$。

所以最小代价就是「所有叶子权值之和」。如果叶子数是奇数，没法刚好两两配对，剩下那一个要么单点染色（$2A$），要么和别的点连成一条路径（$A_{\text{叶}} + A_x$）—— 总之要多付一个端点的钱，挑全局最小的 $A$ 最划算。

$$\text{ans} = \sum_{v \in \text{叶子}} A_v + \left(|\text{叶子}| \bmod 2 = 1 \;?\; \min_i A_i : 0\right)$$

注意 $N = 1$ 时这个点没有边，也要当成叶子处理（答案是 $2A_1$）。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m;
long long a[200005];
int deg[200005];

int main()
{
    cin >> n >> m;

    long long mn = LLONG_MAX;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        if (a[i] < mn)
            mn = a[i];
    }

    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        deg[u]++;
        deg[v]++;
    }

    long long sum = 0;
    int leafCnt = 0;
    for (int i = 1; i <= n; i++)
    {
        if (deg[i] <= 1)
        {
            sum += a[i];
            leafCnt++;
        }
    }

    if (leafCnt % 2 == 1)
        sum += mn;

    cout << sum << "\n";
    return 0;
}
```

