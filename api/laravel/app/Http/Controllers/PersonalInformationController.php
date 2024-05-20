<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class PersonalInformationController extends Controller
{
    /*
     * Controller for working with personal information about the blog
     */
    public function get(): array
    {
        // Get all rows of personal information from the database
        $rows = DB::select('SELECT * FROM `personal_information`');

        // Converting an array of arrays to a single array,
        // which will turn into a single JavaScript object
        $personalInformation = [];
        foreach ($rows as $row) {
            $personalInformation[$row->key] = $row->value;
        }

        return $personalInformation;
    }
}
