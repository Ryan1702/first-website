# 常用算法函数

```cpp
#include <bits/stdc++.h>
using namespace std;
// 自定义排序比较函数（传 const 引用减少拷贝）
bool cmpDesc(int a, int b)
{
    return a > b; // 返回 true 表示 a 排在 b 前面（降序）
}
int main()
{
    const int N = 5;

    // ========== 1. sort 排序 ==========
    // 普通 int 数组：区间是 [arr, arr + N)
    int arr[N] = {5, 2, 9, 1, 7};
    sort(arr, arr + N);                 // 默认升序
    sort(arr, arr + N, greater<int>()); // 降序（仿函数）
    sort(arr, arr + N, cmpDesc);        // 降序（自定义比较函数）

    // vector：区间是 [vec.begin(), vec.end())
    vector<int> vec = {5, 2, 9, 1, 7};
    sort(vec.begin(), vec.end());                 // 默认升序
    sort(vec.begin(), vec.end(), greater<int>()); // 降序
    sort(vec.begin(), vec.end(), cmpDesc);        // 降序

    // ========== 2. reverse 反转 ==========
    // 普通 int 数组
    reverse(arr, arr + N);

    // vector
    reverse(vec.begin(), vec.end());

    // ========== 3. unique 去重（通常先 sort，把相邻重复元素移到末尾）==========
    // 普通 int 数组：返回去重后逻辑末尾指针，长度 = it_arr - arr
    int arr_dup[6] = {3, 1, 2, 2, 3, 1};
    sort(arr_dup, arr_dup + 6);
    auto it_arr = unique(arr_dup, arr_dup + 6);
    int len_arr = it_arr - arr_dup; // 去重后的有效元素个数

    // vector：返回去重后逻辑末尾迭代器，通常配合 erase 真正删掉尾部多余元素
    vector<int> vec_dup = {3, 1, 2, 2, 3, 1};
    sort(vec_dup.begin(), vec_dup.end());
    auto it_vec = unique(vec_dup.begin(), vec_dup.end());
    vec_dup.erase(it_vec, vec_dup.end()); // vector 的 size() 变为去重后大小

    // ========== 4. lower_bound / upper_bound / binary_search（前提：已升序）==========
    // lower_bound：第一个 >= val 的位置；upper_bound：第一个 > val 的位置
    int s_arr[6] = {10, 20, 20, 30, 40, 50};
    bool ok_arr = binary_search(s_arr, s_arr + 6, 30);
    int lb_arr_idx = lower_bound(s_arr, s_arr + 6, 20) - s_arr; // 下标（减首地址）
    int ub_arr_idx = upper_bound(s_arr, s_arr + 6, 20) - s_arr; // 下标（减首地址）

    vector<int> s_vec = {10, 20, 20, 30, 40, 50};
    bool ok_vec = binary_search(s_vec.begin(), s_vec.end(), 30);
    auto lb_vec_it = lower_bound(s_vec.begin(), s_vec.end(), 20); // 迭代器
    auto ub_vec_it = upper_bound(s_vec.begin(), s_vec.end(), 20); // 迭代器
    int lb_vec_idx = lb_vec_it - s_vec.begin();                   // 转下标

    // ========== 5. min / max / minmax ==========
    int mn2 = min(10, 20);
    int mx2 = max(10, 20);
    int mn_list = min({4, 1, 9, 2}); // 多参数 initializer_list
    int mx_list = max({4, 1, 9, 2});
    auto mm = minmax({4, 1, 9, 2}); // mm.first 是最小值，mm.second 是最大值

    // ========== 6. next_permutation / prev_permutation 全排列 ==========
    // 普通 int 数组
    int p_arr[3] = {1, 2, 3};
    sort(p_arr, p_arr + 3);
    do
    {
        // 当前排列在 p_arr[0..2] 中
    } while (next_permutation(p_arr, p_arr + 3)); // 到最大排列后返回 false 并回绕到最小

    // vector
    vector<int> p_vec = {1, 2, 3};
    sort(p_vec.begin(), p_vec.end());
    do
    {
        // 当前排列在 p_vec 中
    } while (next_permutation(p_vec.begin(), p_vec.end()));

    // ========== 7. gcd / lcm（C++17 起）==========
    int g = gcd(12, 18); // 最大公约数：6
    int l = lcm(12, 18); // 最小公倍数：36

    // ========== 8. accumulate 求和（注意初始值类型决定累加结果类型，常写 0LL）==========
    // 普通 int 数组
    long long sum_arr = accumulate(arr, arr + N, 0LL);

    // vector
    long long sum_vec = accumulate(vec.begin(), vec.end(), 0LL);

    // ========== 9. fill / iota 填充与递增序列 ==========
    // fill：填充指定值
    int f_arr[N];
    fill(f_arr, f_arr + N, 0); // 数组全部填 0

    vector<int> f_vec(N);
    fill(f_vec.begin(), f_vec.end(), 0); // vector 全部填 0

    // iota：从起始值开始连续 +1 填入（1, 2, 3, 4, 5）
    int i_arr[N];
    iota(i_arr, i_arr + N, 1);

    vector<int> i_vec(N);
    iota(i_vec.begin(), i_vec.end(), 1);

    return 0;
}
```
