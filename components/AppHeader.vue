<template>
  <div class="header">
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/history">History</a></li>
        <li><a href="/promotional">Promotional</a></li>
        <li><a href="/informational">Informational</a></li>
        <li><a href="/humer">Humer</a></li>
        <li><a href="/misc">Misc</a></li>
        <li><a href="/other">Other</a></li>
        <!-- https://api.storyblok.com/v1/cdn/stories/${path}?version=draft&token=ZQGso3v5SVg23HOVwQ4xVwtt -->
      </ul>
    </nav>
  </div>
</template>

<style>
  .header {
    text-align: center; 
  }
  .header li {
    display: inline-block;
    padding: 10px 5px;
    margin: 5px;
  }
</style>
