import pandas as pd
import requests
import json
from time import sleep
from random import uniform
import math

def convert_nan_to_none(value):
    """Convert NaN values to None for proper JSON serialization."""
    if pd.isna(value):
        return None
    return value

def get_sheet_data_and_convert_to_json(output_json_path="products.json", max_retries=3, sheet_id="1DcQ_5OJ1cfdo6IMvZUPmZCKSLeYri3aDviQzg1gwOgY"):
    """
    Fetches data from Google Sheet, filters valid rows, and converts to JSON format.
    Outputs a simple products.json with only: productId, price, currency, soldOut, gmtdatetime, siteName, productType
    
    Args:
        output_json_path: Path to save the output JSON file
        max_retries: Maximum number of retry attempts for fetching the sheet
        sheet_id: Google Sheet ID to fetch data from
    """
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/csv,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }
    
    for attempt in range(max_retries):
        try:
            # Use requests to get the CSV data
            print(f"Attempt {attempt+1}/{max_retries} to fetch Google Sheet data...")
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()  # Raise an exception for HTTP errors
            
            # Read the CSV data from the response content
            df = pd.read_csv(pd.io.common.StringIO(response.text))

            # Define the required fields
            required_fields = [
                "productId", "gmtdatetime", "price", "currency", "soldOut", "siteName", "productType"
            ]
            
            # Filter out rows with missing productId or from non-roamly sites
            valid_rows = []
            for _, row in df.iterrows():
                # Check if productId is valid (not NaN)
                if pd.isna(row.get("productId")):
                    continue
                if row.get("siteName") != 'roamly':
                    continue
                print(row)
                valid_rows.append(row.to_dict())
            
            print(f"Filtered {len(valid_rows)} valid rows from {len(df)} total rows")
            
            # Convert valid rows to the desired JSON format
            json_data = []
            for row in valid_rows:
                if not row.get('productId'):
                    continue
                try:
                    json_obj = {
                        "productId": int(row["productId"]),
                        "price": int(float(row.get("price", 0))) if not pd.isna(row.get("price")) else 0,
                        "currency": convert_nan_to_none(row.get("currency")),
                        "soldOut": str(row.get("soldOut", "false")).lower() == "true",
                        "gmtdatetime": convert_nan_to_none(row.get("gmtdatetime")),
                        "siteName": convert_nan_to_none(row.get("siteName")),
                        "productType": convert_nan_to_none(row.get("productType"))
                    }
                    json_data.append(json_obj)
                except (ValueError, TypeError) as e:
                    print(f"Error processing row: {row}")
                    print(f"Error details: {e}")
                    continue
            
            # Write the JSON data to a file
            with open(output_json_path, 'w', encoding='utf-8') as json_file:
                json.dump(json_data, json_file, indent=4)
            
            print(f"Conversion completed! JSON file saved at {output_json_path}")
            return json_data
            
        except requests.exceptions.RequestException as e:
            wait_time = uniform(1, 3) * (attempt + 1)  # Exponential backoff with jitter
            print(f"Attempt {attempt+1}/{max_retries} failed: {e}")
            print(f"Waiting {wait_time:.2f} seconds before retry...")
            
            if attempt < max_retries - 1:
                sleep(wait_time)
            else:
                print("Max retries reached. Could not fetch data.")
                return None
        
        except Exception as e:
            print(f"Unexpected error: {e}")
            return None

# Example usage
if __name__ == "__main__":
    data = get_sheet_data_and_convert_to_json(output_json_path="products.json")
    
    if data:
        print(f"Successfully converted {len(data)} products to JSON")
    else:
        print("Failed to process data")
