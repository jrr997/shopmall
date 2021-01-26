<template>
  <div class="wrapper">
    <ul>
      <li>物品1</li>
      <li>物品2</li>
      <li>物品3</li>
      <li>物品4</li>
      <li>物品5</li>
      <li>物品6</li>
      <li>物品7</li>
      <li>物品8</li>
      <li>物品9</li>
      <li>物品10</li>
      <li>物品11</li>
      <li>物品12</li>
      <li>物品13</li>
      <li>物品14</li>
      <li>物品15</li>
      <li>物品16</li>
      <li>物品17</li>
      <li>物品18</li>
      <li>物品19</li>
      <li>物品20</li>
      <li>物品21</li>
      <li>物品22</li>
      <li>物品23</li>
      <li>物品24</li>
      <li>物品25</li>
      <li>物品26</li>
      <li>物品27</li>
      <li>物品28</li>
      <li>物品29</li>
      <li>物品30</li>
      <li>物品31</li>
      <li>物品32</li>
      <li>物品33</li>
      <li>物品34</li>
      <li>物品35</li>
      <li>物品36</li>
      <li>物品37</li>
      <li>物品38</li>
      <li>物品39</li>
      <li>物品40</li>
      <li>物品41</li>
      <li>物品42</li>
      <li>物品43</li>
      <li>物品44</li>
      <li>物品45</li>
      <li>物品46</li>
      <li>物品47</li>
      <li>物品48</li>
      <li>物品49</li>
      <li>物品50</li>
      <li>物品51</li>
      <li>物品52</li>
      <li>物品53</li>
      <li>物品54</li>
      <li>物品55</li>
      <li>物品56</li>
      <li>物品57</li>
      <li>物品58</li>
      <li>物品59</li>
      <li>物品60</li>
      <li>物品61</li>
      <li>物品62</li>
      <li>物品63</li>
      <li>物品64</li>
      <li>物品65</li>
      <li>物品66</li>
      <li>物品67</li>
      <li>物品68</li>
      <li>物品69</li>
      <li>物品70</li>
      <li>物品71</li>
      <li>物品72</li>
      <li>物品73</li>
      <li>物品74</li>
      <li>物品75</li>
      <li>物品76</li>
      <li>物品77</li>
      <li>物品78</li>
      <li>物品79</li>
      <li>物品80</li>
      <li>物品81</li>
      <li>物品82</li>
      <li>物品83</li>
      <li>物品84</li>
      <li>物品85</li>
      <li>物品86</li>
      <li>物品87</li>
      <li>物品88</li>
      <li>物品89</li>
      <li>物品90</li>
      <li>物品91</li>
      <li>物品92</li>
      <li>物品93</li>
      <li>物品94</li>
      <li>物品95</li>
      <li>物品96</li>
      <li>物品97</li>
      <li>物品98</li>
      <li>物品99</li>
      <li>物品100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Category',
  mounted:function() {
    let bs = new BScroll('.wrapper', {
  // 配置
  probeType:2
  })
  bs.on('scroll',position => {
    console.log(position);
  })

  }
}
</script>

<style>
.wrapper {
  height: 150px;
  background-color: pink;
  overflow: hidden;
}
</style>
