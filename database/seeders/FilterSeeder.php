<?php

namespace Database\Seeders;

use App\Models\Filter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FilterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Vintage Effect',
                'filter' => "[{
                    name: 'Brightness',
                    property: 'brightness',
                    value: 90,
                    range: {
                        min: 0,
                        max: 200
                    },
                    unit: '%',
                    icon: <FontAwesomeIcon icon={faSun} />
                },{
                    name: 'contrast',
                    property: 'brightness',
                    value: 120,
                    range: {
                        min: 0,
                        max: 200
                    },
                    unit: '%',
                    icon: <FontAwesomeIcon icon={faSun} />
                },{
                    name: 'Sepia',
                    property: 'sepia',
                    value: 50,
                    range: {
                        min: 0,
                        max: 100
                    },
                    unit: '%',
                    icon: <FontAwesomeIcon icon={faSun} />
                }]",
                
            ],
            // Add more data as needed
        ];

        // Insert the data into the database
        Filter::insert($data); // Replace with your model
    }
}
