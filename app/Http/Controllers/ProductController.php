<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;

use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProducResource;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $search = request('search', false);
        $perPage = request('per_page', 10);

        //sorting
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');

        $query = Product::query();
        // Apply sorting to the query based on the request parameters
        $query->orderBy($sortField, $sortDirection);
        //if search is available
        if ($search) {
            $query->where('title', 'like', "%$search%")
                ->orWhere('description', 'like', "%$search%");
        }
        // dd($query->get()); // Debug dump the results
        // Return a paginated list of products using the ProductListResource that appear frontend
        return ProductListResource::collection($query->paginate($perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        // Validate the request and create a new product
        return new ProductResource(Product::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //        // Return a single product using the ProducResource
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        // Validate the request and update the product
        $product->update($request->validated());
        // Return the updated product using the ProducResource
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete the product and return a success message
        $product->delete();
        // Return a no content response on successful deletion
        return response()->noContent();
    }
}