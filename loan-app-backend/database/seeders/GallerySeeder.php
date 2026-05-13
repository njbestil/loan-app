<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Gallery;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for($i = 0; $i < 10; $i++){
            Gallery::create([
                'title' => $faker->sentence,
                'category' => $faker->word,
                'date' => $faker->date,
                'src' => $faker->word,
                'type' => $faker->word
            ]);
        }
    }
}