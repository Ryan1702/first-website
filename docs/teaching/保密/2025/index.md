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

## 难度顺序（由易到难）

| 题号 | 题目 | 算法 / 技巧 |
| :---: | --- | --- |
| 1 | 判断素数 | 试除法、枚举到 $\sqrt{x}$、$0$ 和 $1$ 的特判 |
| 3 | 开关灯 | 模拟、整行整列取反、交点只翻一次、维护亮灯数 |
| 2 | 加油站 | 排序、相邻差取最小、再扫一遍统计对数 |
| 7 | 最长子序列 | 排序、二分 或 双指针、区间最值性质 |
| 6 | 兄弟数 | 单调栈、从右往左扫、STL `stack` |
| 5 | 迷宫 | BFS、按输入建两套墙、第一行多源起点、STL `queue` |
| 4 | 艾莲的化学实验 | 有向图、`vector` 邻接表、对查询点逐个 DFS 判可达 |
| 8 | 染色 | 结论推导、叶子计数、奇偶修正 |

## 第 1 题 · 判断素数

### 思路

数据范围是 $0 \le x \le 10^{10}$，最多 $T \le 100$ 个数。判断素数只需要试除到 $\sqrt{x}$：如果 $x$ 有大于 $\sqrt{x}$ 的因子，它必然还配有一个小于 $\sqrt{x}$ 的因子。这里 $\sqrt{10^{10}} = 10^5$，所以单个数最多试除 $10^5$ 次，$100$ 个数一共 $10^7$ 次取模，很轻松。

两个细节：$x < 2$（也就是 $0$ 和 $1$）不是素数，要单独判断；循环写成 `i * i <= x` 时，$i$ 必须是 `long long`（代码里统一用 `typedef long long ll`），否则 $10^5$ 的平方会超出 `int` 的范围。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

bool isPrime(ll x)
{
    if (x < 2)
        return false;
    for (ll i = 2; i * i <= x; i++)
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
        ll x;
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

坐标可以到 $10^{12}$，差值要用 `ll`；题目允许多个加油站位置相同，这时最小距离是 $0$，按同样方法统计即可。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n;
ll a[100005];

int main()
{
    cin >> n;
    for (int i = 0; i < n; i++)
        cin >> a[i];

    sort(a, a + n);

    ll best = a[1] - a[0];
    for (int i = 1; i < n; i++)
        best = min(best, a[i] - a[i - 1]);

    ll cnt = 0;
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

最直白的写法是每次操作把第 $r$ 行、第 $c$ 列全部翻一遍再重新数亮灯数，单次 $O(NM)$。

其实可以省一半功夫：把「第 $r$ 行整体取反 + 第 $c$ 列整体取反」拆成两步——先翻整行，再翻整列时**跳过交点** $(r, c)$，因为题目规定交点只改变一次。这样每次只动 $N + M - 1$ 盏灯；再额外维护一个「当前亮灯总数」，翻一盏就 $\pm 1$，不用每次重新数。

单次操作 $O(N + M)$，总复杂度 $O(Q(N+M))$，比 $O(QNM)$ 快一个量级。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

bool on[10][10];

int n, m, q;

// 把一盏灯取反，同时维护「当前亮灯总数」
int lit = 0;
void flip(int i, int j)
{
    on[i][j] = !on[i][j];
    if (on[i][j])
        lit++;
    else
        lit--;
}

int main()
{
    cin >> n >> m >> q;

    int ans = 0;
    for (int t = 0; t < q; t++)
    {
        int x;
        cin >> x;
        int r = x / 100;
        int c = x % 10;

        // 第 r 行全部取反
        for (int j = 1; j <= m; j++)
            flip(r, j);
        // 第 c 列取反，但交点 (r, c) 上面已经翻过一次，跳过它，保证只翻一次
        for (int i = 1; i <= n; i++)
        {
            if (i != r)
                flip(i, c);
        }

        if (lit > ans)
            ans = lit;
    }

    cout << ans << "\n";
    return 0;
}
```

## 第 4 题 · 艾莲的化学实验

### 思路

把每种药剂看成点、每条溶解关系看成有向边 $u \to v$（$u$ 能溶于 $v$）。这里用 `vector` 建邻接表：点数只有 $200$，其实用邻接矩阵也能存下，但邻接表在遍历出边时不用扫一整行，写起来也更简洁，所以选邻接表。

对每组查询，从每个被查询的药剂出发各做一次 DFS，记下它能到达哪些点（$K$ 次 DFS）；然后两两检查：只要存在一对 $(u, v)$，$u$ 到不了 $v$ 且 $v$ 也到不了 $u$，就输出 `NO`，否则 `YES`。

复杂度约 $O(K(N+M) + K^2)$，比 Floyd 求传递闭包的 $O(N^3)$ 更适合本题「每组数据边可能很多、但查询只要 $K$ 个点」的情况；而且 DFS 只沿着查询点扩散，实际更快。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main()
{
    int T;
    cin >> T;
    while (T--)
    {
        int n, m;
        cin >> n >> m;

        // 用 vector 建邻接表：u 能溶于哪些药剂
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < m; i++)
        {
            int u, v;
            cin >> u >> v;
            adj[u].push_back(v);
        }

        int k;
        cin >> k;
        vector<int> q(k);
        for (int i = 0; i < k; i++)
            cin >> q[i];

        // 对查询里的每个药剂做一次 DFS，记下它能到达哪些点
        vector<vector<char>> can(k, vector<char>(n + 1, 0));
        for (int t = 0; t < k; t++)
        {
            int s = q[t];
            stack<int> st;
            st.push(s);
            can[t][s] = 1;
            while (!st.empty())
            {
                int u = st.top();
                st.pop();
                for (int v : adj[u])
                {
                    if (!can[t][v])
                    {
                        can[t][v] = 1;
                        st.push(v);
                    }
                }
            }
        }

        // 两两检查：至少一个方向可达
        bool ok = true;
        for (int i = 0; i < k; i++)
        {
            for (int j = i + 1; j < k; j++)
            {
                if (!can[i][q[j]] && !can[j][q[i]])
                    ok = false;
            }
        }

        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
```

## 第 5 题 · 迷宫

### 思路

输入是「按行交替」的：第 $i$ 行先给 $M-1$ 个同一行相邻列之间的墙，再给（如果还有下一行）$M$ 个与下一行之间的墙。

- `wallRight[i][j]`：第 $i$ 行第 $j$ 列与第 $j+1$ 列之间有墙；
- `wallDown[i][j]`：第 $i$ 行与第 $i+1$ 行第 $j$ 列之间有墙。

起点可以是第一行的任意格子，所以把它们全部以距离 $0$ 入队，做一次 BFS（用 STL 的 `queue`）；答案是最后一行里的最小距离，最后一行的格子一个都没被访问到就输出 `No Way`。

$N, M \le 500$，点数 $2.5 \times 10^5$，每个点只看 4 个邻居，复杂度 $O(NM)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n, m;
int wallRight[505][505];   // 同一行里 j 与 j+1 之间的墙
int wallDown[505][505];    // 第 i 行与第 i+1 行之间的墙
int dist_[505][505];

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
            dist_[i][j] = -1;

    // 第一行任意格子都可以当起点，全部入队
    queue<pair<int, int>> q;
    for (int j = 1; j <= m; j++)
    {
        dist_[1][j] = 0;
        q.push({1, j});
    }

    while (!q.empty())
    {
        int x = q.front().first;
        int y = q.front().second;
        q.pop();

        // 向左
        if (y - 1 >= 1 && wallRight[x][y - 1] == 0 && dist_[x][y - 1] == -1)
        {
            dist_[x][y - 1] = dist_[x][y] + 1;
            q.push({x, y - 1});
        }
        // 向右
        if (y + 1 <= m && wallRight[x][y] == 0 && dist_[x][y + 1] == -1)
        {
            dist_[x][y + 1] = dist_[x][y] + 1;
            q.push({x, y + 1});
        }
        // 向上
        if (x - 1 >= 1 && wallDown[x - 1][y] == 0 && dist_[x - 1][y] == -1)
        {
            dist_[x - 1][y] = dist_[x][y] + 1;
            q.push({x - 1, y});
        }
        // 向下
        if (x + 1 <= n && wallDown[x][y] == 0 && dist_[x + 1][y] == -1)
        {
            dist_[x + 1][y] = dist_[x][y] + 1;
            q.push({x + 1, y});
        }
    }

    int ans = -1;
    for (int j = 1; j <= m; j++)
    {
        if (dist_[n][j] == -1)
            continue;
        if (ans == -1 || dist_[n][j] < ans)
            ans = dist_[n][j];
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

「右边第一个不小于自己的元素」，从右往左扫，用 STL 的 `stack` 存候选下标：

- 处理 $i$ 时，栈顶那些 $a$ 值比 $a_i$ 小的都可以弹掉 —— 它们比 $a_i$ 小，不可能成为答案；
- 弹完之后，栈顶就是右边第一个满足 $a_j \ge a_i$ 的位置；栈空说明右边没有，记 $-1$；
- 最后把 $i$ 压入栈。

每个下标最多进栈、出栈各一次，总复杂度 $O(n)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n;
ll a[100005];
int ans[100005];

int main()
{
    cin >> n;
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    // 单调栈：栈里存下标，对应的 a 值从栈底到栈顶单调不增
    stack<int> st;
    for (int i = n; i >= 1; i--)
    {
        // 右边比 a[i] 小的都不可能是答案
        while (!st.empty() && a[st.top()] < a[i])
            st.pop();

        if (st.empty())
            ans[i] = -1;
        else
            ans[i] = st.top();

        st.push(i);
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

排序之后，任意一段连续区间 $[i, j]$ 的元素都能组成合法子序列，最大值与最小值之差就是 $a_j - a_i$；反过来，最优解也可以补齐成某段连续区间。于是问题变成：在排序后的数组里找最长的一段，使两端之差落在 $[L, R]$。

这里给两种写法：

- **写法一（排序 + 二分）**：枚举左端点 $i$，二分找最右边满足 $a_j - a_i \le R$ 的 $j$，再看差值是否 $\ge L$。复杂度 $O(n\log n)$。
- **写法二（排序 + 双指针）**：注意到 $i$ 右移时，最右的合法 $j$ 只会往右走、不会回头，所以用双指针扫描即可，右端点总共移动 $n$ 次。复杂度 $O(n)$（排序另算）。

两种写法在评测上都能过，双指针常数更小、也更符合「双指针」这一章的主题。

### 代码 1（排序 + 二分）

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

// 写法一：排序 + 二分
int n;
ll L, R;
ll a[200005];

int main()
{
    cin >> n >> L >> R;
    for (int i = 0; i < n; i++)
        cin >> a[i];

    sort(a, a + n);

    int ans = 0;
    for (int i = 0; i < n; i++)
    {
        // 找最右边满足 a[j] - a[i] <= R 的位置
        int lo = i, hi = n - 1, j = -1;
        while (lo <= hi)
        {
            int mid = (lo + hi) / 2;
            if (a[mid] - a[i] <= R)
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
            ans = max(ans, j - i + 1);
    }

    cout << ans << "\n";
    return 0;
}
```

### 代码 2（排序 + 双指针）

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

// 写法二：排序 + 双指针（右端点只往右走，不用二分）
int n;
ll L, R;
ll a[200005];

int main()
{
    cin >> n >> L >> R;
    for (int i = 0; i < n; i++)
        cin >> a[i];

    sort(a, a + n);

    int ans = 0;
    int j = 0;
    for (int i = 0; i < n; i++)
    {
        // 右端点尽量右移，但不能超过 a[i] + R
        if (j < i)
            j = i;
        while (j + 1 < n && a[j + 1] - a[i] <= R)
            j++;

        // 此时 [i, j] 是左端点为 i 时最长的合法区间
        if (a[j] - a[i] >= L)
            ans = max(ans, j - i + 1);
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

注意 $N = 1$ 时这个点没有边，也要当成叶子处理（答案是 $2A_1$）。读入的边只需要统计度数，不需要真的存图。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n, m;
ll a[200005];
int deg[200005];

int main()
{
    cin >> n >> m;

    ll mn = (1LL << 62);
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

    // 叶子（度 <= 1，N = 1 时也算）必须当端点
    ll sum = 0;
    int leafCnt = 0;
    for (int i = 1; i <= n; i++)
    {
        if (deg[i] <= 1)
        {
            sum += a[i];
            leafCnt++;
        }
    }

    // 叶子数是奇数时，还要多付一个端点的代价，挑最小的 A
    if (leafCnt % 2 == 1)
        sum += mn;

    cout << sum << "\n";
    return 0;
}
```

