---
search:
  exclude: true
---

# 2024 年试卷题解

<div class="lock-gate" data-password="daimawenjian">

<strong>本页需要密码才能查看。</strong>

<input id="lock-pass" type="password" placeholder="输入访问密码" autocomplete="off" />
<button id="lock-btn" type="button">解锁</button>
<p id="lock-msg"></p>

</div>

原卷：[2024 年考题](../../final/2024.pdf)

## 第 1 题 · A 的 B 次方的后四位

### 思路

用快速幂，每一步都对 $10000$ 取模，最后用 `%04lld` 输出，不足四位自动补零。注意 $B = 0$ 时结果是 $0001$。复杂度 $O(\log B)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int T;
    cin >> T;
    while (T--)
    {
        long long A, B;
        cin >> A >> B;

        long long res = 1 % 10000;
        long long base = A % 10000;
        while (B > 0)
        {
            if (B & 1)
                res = res * base % 10000;
            base = base * base % 10000;
            B >>= 1;
        }

        printf("%04lld\n", res);
    }
    return 0;
}
```

## 第 2 题 · 最大子列和

### 思路

经典在线 DP：设 $cur$ 为「以当前位置结尾的最大子段和」，有 $cur = \max(a_i, cur + a_i)$，答案取所有 $cur$ 的最大值。注意数组全是负数时答案就是最大的那个负数，所以 $cur$ 和答案都要用第一个元素初始化。复杂度 $O(n)$。

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

    long long cur = a[0], ans = a[0];
    for (int i = 1; i < n; i++)
    {
        if (cur < 0)
            cur = a[i];
        else
            cur += a[i];
        if (cur > ans)
            ans = cur;
    }

    cout << ans << "\n";
    return 0;
}
```

## 第 3 题 · 重排链表

### 思路

输入的结点不一定都在链表上，所以先从头地址顺着 `next` 走一遍，把真正的链表结点存进数组。然后用双指针从两端交替取：先取尾结点，再取头结点，再取倒数第二个……最后按顺序输出，地址用 `%05d` 补足五位。复杂度 $O(n)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int data_[100000];
int nxt[100000];

int main()
{
    int head, n;
    cin >> head >> n;

    for (int i = 0; i < n; i++)
    {
        int addr, d, nx;
        cin >> addr >> d >> nx;
        data_[addr] = d;
        nxt[addr] = nx;
    }

    vector<int> chain;
    int p = head;
    while (p != -1)
    {
        chain.push_back(p);
        p = nxt[p];
    }

    vector<int> order;
    int l = 0, r = (int)chain.size() - 1;
    bool takeR = true;
    while (l <= r)
    {
        if (takeR)
            order.push_back(chain[r--]);
        else
            order.push_back(chain[l++]);
        takeR = !takeR;
    }

    for (int i = 0; i < (int)order.size(); i++)
    {
        int addr = order[i];
        int nx = (i + 1 < (int)order.size() ? order[i + 1] : -1);
        if (nx == -1)
            printf("%05d %d -1\n", addr, data_[addr]);
        else
            printf("%05d %d %05d\n", addr, data_[addr], nx);
    }
    return 0;
}
```

## 第 4 题 · 兔子试毒

### 思路

把 $1000$ 瓶药水按二进制编号，每一位对应一只兔子，让它喝所有这一位为 $1$ 的药水。因为 $2^{10} = 1024 \ge 1000$，$10$ 只兔子就能区分 $1000$ 瓶；所有兔子同时喝、同时观察，只需要 $1$ 天。所以输出 `10 1`。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    cout << "10 1\n";
    return 0;
}
```

## 第 5 题 · 淹没岛屿

### 思路

先 DFS/BFS 找出每个岛屿（陆地连通块）。对岛屿里的每个格子看四个方向：只要有一个格子四面都是陆地，它就不会被淹没，整座岛就保住了；如果所有格子都至少挨着一片海，这座岛会完全消失。统计消失的岛屿个数，复杂度 $O(N^2)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
char g[1005][1005];
bool vis[1005][1005];

int qx[1000005], qy[1000005];

int main()
{
    cin >> n;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> g[i][j];

    int dx[4] = {1, -1, 0, 0};
    int dy[4] = {0, 0, 1, -1};

    int deadIslands = 0;
    for (int si = 1; si <= n; si++)
    {
        for (int sj = 1; sj <= n; sj++)
        {
            if (g[si][sj] != '#' || vis[si][sj])
                continue;

            int head = 0, tail = 0;
            qx[tail] = si;
            qy[tail] = sj;
            tail++;
            vis[si][sj] = true;

            bool survive = false;
            while (head < tail)
            {
                int x = qx[head], y = qy[head];
                head++;

                bool allLand = true;
                for (int k = 0; k < 4; k++)
                {
                    int nx = x + dx[k], ny = y + dy[k];
                    if (nx < 1 || nx > n || ny < 1 || ny > n || g[nx][ny] == '.')
                    {
                        allLand = false;
                        break;
                    }
                }
                if (allLand)
                    survive = true;

                for (int k = 0; k < 4; k++)
                {
                    int nx = x + dx[k], ny = y + dy[k];
                    if (nx < 1 || nx > n || ny < 1 || ny > n)
                        continue;
                    if (g[nx][ny] == '#' && !vis[nx][ny])
                    {
                        vis[nx][ny] = true;
                        qx[tail] = nx;
                        qy[tail] = ny;
                        tail++;
                    }
                }
            }

            if (!survive)
                deadIslands++;
        }
    }

    cout << deadIslands << "\n";
    return 0;
}
```

## 第 6 题 · 引水入城

### 思路

从第一行每个城市出发，向「严格更低」的相邻城市搜下去，记录能到达最后一行的最小列号和最大列号。若最后一行有城市根本到不了，直接输出 $0$ 和这些城市的个数；否则每个起点对应一段区间，问题变成「用最少的区间覆盖 $1 \sim M$」，按左端点排序后贪心选右端点最远的即可。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m;
int h[505][505];
int mark[505][505];
int stamp = 0;

int sx[250005], sy[250005];
bool bottomReach[505];
int intervalL[505], intervalR[505];

int dx[4] = {1, -1, 0, 0};
int dy[4] = {0, 0, 1, -1};

int main()
{
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cin >> h[i][j];

    for (int start = 1; start <= m; start++)
    {
        stamp++;
        int top = 0;
        sx[top] = 1;
        sy[top] = start;
        top++;
        mark[1][start] = stamp;

        int l = m + 1, r = 0;
        while (top > 0)
        {
            top--;
            int x = sx[top], y = sy[top];

            if (x == n)
            {
                bottomReach[y] = true;
                if (y < l)
                    l = y;
                if (y > r)
                    r = y;
            }

            for (int k = 0; k < 4; k++)
            {
                int nx = x + dx[k], ny = y + dy[k];
                if (nx < 1 || nx > n || ny < 1 || ny > m)
                    continue;
                if (mark[nx][ny] == stamp)
                    continue;
                if (h[nx][ny] < h[x][y])
                {
                    mark[nx][ny] = stamp;
                    sx[top] = nx;
                    sy[top] = ny;
                    top++;
                }
            }
        }

        intervalL[start] = l;
        intervalR[start] = r;
    }

    int missing = 0;
    for (int j = 1; j <= m; j++)
        if (!bottomReach[j])
            missing++;

    if (missing > 0)
    {
        cout << 0 << "\n";
        cout << missing << "\n";
        return 0;
    }

    vector<pair<int, int>> segs;
    for (int j = 1; j <= m; j++)
        if (intervalL[j] <= intervalR[j])
            segs.push_back({intervalL[j], intervalR[j]});

    sort(segs.begin(), segs.end());

    int used = 0, need = 1, idx = 0;
    while (need <= m)
    {
        int bestR = -1;
        while (idx < (int)segs.size() && segs[idx].first <= need)
        {
            if (segs[idx].second > bestR)
                bestR = segs[idx].second;
            idx++;
        }
        if (bestR < need)
            break;
        need = bestR + 1;
        used++;
    }

    cout << 1 << "\n";
    cout << used << "\n";
    return 0;
}
```

## 第 7 题 · 无聊的游戏

### 思路

逐轮比较：只有 $A_i > B_i$ 才算 Alice 赢，否则（含相等）Bob 赢。最后比较双方胜场数，$Bob$ 胜场不少于 Alice 时输出 Bob（题目规定平局算 Bob）。复杂度 $O(N)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int n;
    cin >> n;
    long long alice = 0, bob = 0;
    for (int i = 0; i < n; i++)
    {
        long long a, b;
        cin >> a >> b;
        if (a > b)
            alice++;
        else
            bob++;
    }

    if (alice > bob)
        cout << "Alice " << alice << "\n";
    else
        cout << "Bob " << bob << "\n";
    return 0;
}
```

## 第 8 题 · 字母串处理

### 思路

遍历字符串，遇到元音（`a e i o u y` 及大写）直接跳过，其余字符输出一个 `.` 再加上它的小写形式。复杂度 $O(|S|)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

bool isVowel(char c)
{
    c = tolower(c);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' || c == 'y';
}

int main()
{
    string s;
    cin >> s;

    for (char c : s)
    {
        if (isVowel(c))
            continue;
        cout << "." << (char)tolower(c);
    }
    cout << "\n";
    return 0;
}
```

## 第 9 题 · 鱼与熊掌

### 思路

对每种物品维护一个「拥有它的人」的列表，按人编号从小到大加入，天然有序。每次查询取两个列表里较短的那个遍历，在另一个列表里二分查找是否有这个人。单次查询 $O(\min(|L_x|,|L_y|) \log N)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m, q;
vector<int> who[100005];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    cin >> n >> m;
    for (int i = 1; i <= n; i++)
    {
        int k;
        cin >> k;
        for (int j = 0; j < k; j++)
        {
            int x;
            cin >> x;
            who[x].push_back(i);
        }
    }

    cin >> q;
    while (q--)
    {
        int x, y;
        cin >> x >> y;
        vector<int> &p = who[x], &t = who[y];
        if (p.size() > t.size())
            swap(p, t);

        int cnt = 0;
        for (int id : p)
            if (binary_search(t.begin(), t.end(), id))
                cnt++;
        cout << cnt << "\n";
    }
    return 0;
}
```

## 第 10 题 · 绝对值比大小

### 思路

输入到文件结束为止，把数存进数组，然后自定义比较函数排序：先按绝对值从大到小，绝对值相同时按原值从小到大，最后输出。复杂度 $O(N \log N)$。

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;

long long a[100005];

bool cmp(long long x, long long y)
{
    long long ax = llabs(x), ay = llabs(y);
    if (ax != ay)
        return ax > ay;
    return x < y;
}

int main()
{
    int n = 0;
    long long v;
    while (cin >> v)
        a[n++] = v;

    sort(a, a + n, cmp);

    for (int i = 0; i < n; i++)
    {
        if (i > 0)
            cout << " ";
        cout << a[i];
    }
    cout << "\n";
    return 0;
}
```

