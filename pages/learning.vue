<template>
  <section class="container mb-12">
    <div class="flex flex-col sm:flex-row gap-4">
      <Card class="basis-3/5">
        <div class="flex flex-col justify-between h-full">
          <div>
            <div class="text-4xl font-bold mb-4">VueJS QUIZ</div>
            <div class="mb-4 text-lg font-semibold text-slate-500">
              Test your knowledge with these amazing Quiz Questions and enhance
              your VueJS skills
            </div>
          </div>
          <div>
            <Button>Start Quiz</Button>
          </div>
        </div>
      </Card>
      <Card class="basis-2/5">
        <div class="font-bold text-4xl mb-4">VueJS Interview Questions</div>
        <div class="mb-4 text-lg font-semibold text-slate-500">
          Find latest VueJS Interview questions
        </div>
        <div><Button>Read More</Button></div>
      </Card>
    </div>
  </section>

  <Listing title="Youtube: VueJS Tutorials">
    <div class="grid grid-cols-none sm:grid-cols-5 gap-4">
      <YoutubeVideo />
      <YoutubeVideo />
      <YoutubeVideo />
      <YoutubeVideo />
      <YoutubeVideo />
    </div>
  </Listing>

  <Listing title="Books & CheatSheets">
    <div class="grid grid-cols-none sm:grid-cols-5 gap-4">
      <Book />
      <Book />
      <Book />
      <Book />
      <Book />
    </div>
  </Listing>

  <Listing title="Video Courses">
    <div class="grid grid-cols-none sm:grid-cols-4 gap-4">
      <UdemyCourse />
      <UdemyCourse />
      <UdemyCourse />
      <UdemyCourse />
    </div>
  </Listing>

  <Listing title="VueJS Blogs">
    <div class="grid grid-cols-none sm:grid-cols-4 gap-4">
      <Article />
      <Article />
      <Article />
      <Article />
    </div>
  </Listing>

  <Listing title="Udemy Courses">
    <div class="grid grid-cols-none sm:grid-cols-4 gap-4">
      <UdemyCourse />
      <UdemyCourse />
      <UdemyCourse />
      <UdemyCourse />
    </div>
  </Listing>

  <Listing title="Top Project Ideas">
    <div class="grid grid-cols-none sm:grid-cols-4 gap-4">
      <Card>
        <div class="">VueJS QUIZ</div>
        <div>
          Checkout these amazing VueJS Quiz Questions and enhance your VueJS
          knowledge
        </div>
        <div>
          <Button>Start Quiz</Button>
        </div>
      </Card>
      <Card>
        <div>VueJS Interview Questions</div>
        <div>Find latest VueJS Interview questions</div>
        <div><Button>Read More</Button></div>
      </Card>
      <Card>
        <div>VueJS Interview Questions</div>
        <div>Find latest VueJS Interview questions</div>
        <div><Button>Read More</Button></div>
      </Card>
      <Card>
        <div>VueJS Interview Questions</div>
        <div>Find latest VueJS Interview questions</div>
        <div><Button>Read More</Button></div>
      </Card>
    </div>
  </Listing>

  <Listing title="Youtube Channels">
    <div class="grid grid-cols-none sm:grid-cols-5 gap-4">
      <YoutubeChannel />
      <YoutubeChannel />
      <YoutubeChannel />
      <YoutubeChannel />
      <YoutubeChannel />
    </div>
  </Listing>
</template>

<script setup>
useHead({
  title: "VueCoSystem - Learning",
});
</script>
